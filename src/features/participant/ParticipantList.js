import React from "react";

import { List, ListItem } from "@mui/material";

import Participant from "./Participant";
import { useGetPollParticipantsQuery } from "./participantApiSlice";

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
         <List>
            {participants.ids.map((participantId) => (
               <ListItem key={participantId}>
                  <Participant
                     participant_id={participantId}
                     name={participants.entities[participantId].pseudo}
                  />
               </ListItem>
            ))}
         </List>
      );
   }

   return content;
}

export default ParticipantList;
