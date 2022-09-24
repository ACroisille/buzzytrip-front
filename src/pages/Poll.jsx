import React from "react";
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import ParticipantList from "../components/ParticipantList";
import ChoiceList from "../components/ChoiceList";
import ChoiceDialog from "../components/ChoiceDialog";

const participantsList = [
   {
      id: 1,
      name: "Pierre",
   },
   {
      id: 2,
      name: "Paul",
   },
   {
      id: 3,
      name: "Jack",
   },
];
const choicesList = [
   {
      id: 1,
      title: "Choice 1",
      description: "This is the first choice !",
   },
   {
      id: 2,
      title: "Choice 2",
      description: "This is the second choice !",
   },
   {
      id: 3,
      title: "Choice 3",
      description: "This is the third choice !",
   },
];

function Poll() {
   const [participants, updateParticipants] = useState(participantsList);
   const [choices, updateChoices] = useState(choicesList);

   return (
      <Stack>
         <ChoiceDialog choices={choices} updateChoices={updateChoices} />
         <Grid container>
            <Grid item xs={2}>
               <ParticipantList
                  participants={participants}
                  updateParticipants={updateParticipants}
               />
            </Grid>
            <Grid item xs={10}>
               <ChoiceList choices={choices} updateChoices={updateChoices} />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
