import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import ChoiceCard from "./ChoiceCard";
import Paginator from "../../components/Paginator";

import { useGetPollChoicesQuery } from "./choiceApiSlice";
import { useGetVoteCountQuery } from "../participant/participantApiSlice";
import {
   selectCurrentPage,
   selectParticipantId,
   setParticipantVotesCount,
   setCurrentPage,
} from "../participant/participantSlice";

/**
 * Compnonent that list choices
 * @param pollId
 * @param page
 * @returns {JSX.Element}
 * @constructor
 */
const ChoiceList = ({ pollId }) => {
   const dispatch = useDispatch();
   const currentParticipant = useSelector(selectParticipantId);
   const currentPage = useSelector(selectCurrentPage);

   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollChoicesQuery(
      { pollId, page: currentPage },
      { refetchOnMountOrArgChange: true }
   );

   // Get Vote Count
   const { data: voteCount } = useGetVoteCountQuery(
      {
         participantId: currentParticipant,
      },
      { skip: !currentParticipant }
   );

   // Dispatch current participant vote count
   useEffect(() => {
      dispatch(setParticipantVotesCount({ voteCount: voteCount?.vote_count }));
   }, [dispatch, voteCount]);

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      const totalPageCount = Math.ceil(
         choices.totalChoiceCount / process.env.REACT_APP_CHOICE_PER_PAGE
      );
      // If there is only page, no need to display the paginator
      const choicePaginator =
         totalPageCount > 1 ? (
            <Paginator
               currentPage={currentPage}
               totalPageCount={totalPageCount}
               setPage={setCurrentPage}
            />
         ) : null;

      content = (
         <div className="w-full">
            <ul className="flex flex-col space-y-3">
               {choices.ids.map((choiceId) => (
                  <li key={choiceId}>
                     <ChoiceCard
                        pollId={pollId}
                        currentPage={currentPage}
                        choice={choices.entities[choiceId]}
                        index={choices.ids.findIndex((x) => x === choiceId)}
                     />
                  </li>
               ))}
            </ul>
            {choicePaginator}
         </div>
      );
   }

   return content;
};

ChoiceList.propTypes = {
   pollId: PropTypes.string,
   participantId: PropTypes.number,
};

export default ChoiceList;
