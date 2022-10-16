import React from "react";
import { List, ListItem } from "@mui/material";
import Participant from "./Participant";

function ParticipantList({ participants }) {
   return (
      <List>
         {participants.map((participant) => (
            <ListItem key={participant.id}>
               <Participant name={participant.pseudo} />
            </ListItem>
         ))}
      </List>
   );
}

export default ParticipantList;
