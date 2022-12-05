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
   selectCurrentSort,
   setParticipantVotesCount,
   setCurrentPage,
   setCurrentSort,
} from "../participant/participantSlice";
import Dropdown from "../../components/Dropdown";

const sortOptions = [
   {
      value: "creation_time_desc",
      label: "newest to oldest",
   },
   {
      value: "creation_time_asc",
      label: "oldest to newest",
   },
];

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
   const currentSort = useSelector(selectCurrentSort);

   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollChoicesQuery(
      { pollId, page: currentPage, sort: currentSort },
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
            <Dropdown
               options={sortOptions}
               selectedOption={currentSort}
               setSort={setCurrentSort}
               setPage={setCurrentPage}
            />
            <ul className="grid sm:grid-cols-1 sm:gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-4 lg:gap-4">
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
