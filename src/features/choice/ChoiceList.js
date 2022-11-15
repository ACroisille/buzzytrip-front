import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ChoiceCard from "./ChoiceCard";
import { useGetPollChoicesQuery } from "./choiceApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
   selectParticipantId,
   setParticipantVotesCount,
} from "../participant/participantSlice";

const ChoiceList = ({ pollId }) => {
   const dispatch = useDispatch();
   const currentParticipant = useSelector(selectParticipantId);
   const {
      data: choices,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollChoicesQuery({ pollId });

   useEffect(() => {
      // Total vote count for current participant
      const cpVoteCount =
         choices?.ids.length > 0
            ? choices?.ids
                 .map((id) => choices?.entities[id]?.votes)
                 .reduce((p, c) => p.concat(c))
                 .filter((v) => v?.participant === currentParticipant).length
            : 0;
      dispatch(setParticipantVotesCount({ voteCount: cpVoteCount }));
   }, [dispatch, currentParticipant, choices]);

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <div className="w-full">
            <ul className="flex flex-col space-y-3">
               {choices.ids.map((choiceId) => (
                  <li key={choiceId}>
                     <ChoiceCard choice={choices.entities[choiceId]} />
                  </li>
               ))}
            </ul>
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
