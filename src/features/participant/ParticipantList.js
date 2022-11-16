import React from "react";
import ParticipantCard from "./ParticipantCard";
import { useGetPollParticipantsQuery } from "./participantApiSlice";
import PropTypes from "prop-types";

/**
 * Compnonent that list participants
 * @param pollId
 * @returns {JSX.Element}
 * @constructor
 */
function ParticipantList({ pollId }) {
   const {
      data: participants,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPollParticipantsQuery({ pollId });

   let content;
   if (isError) {
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <div className="w-full">
            <ul className="flex flex-col space-y-2">
               {participants.ids.map((participantId) => (
                  <li key={participantId}>
                     <ParticipantCard
                        participant_id={participantId}
                        name={participants.entities[participantId].pseudo}
                     />
                  </li>
               ))}
            </ul>
         </div>
      );
   }

   return content;
}

ParticipantList.propTypes = {
   pollId: PropTypes.string,
};

export default ParticipantList;
