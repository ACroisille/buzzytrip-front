import React from "react";
import { Grid, Stack } from "@mui/material";
import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useGetLoggedParticipantQuery } from "../participant/participantApiSlice";
import ParticipantList from "../participant/ParticipantList";

function Poll() {
   const { poll_id: pollId } = useParams();
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   const userId = decoded?.user_id;

   const {
      data: logged,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetLoggedParticipantQuery({
      userId: userId,
      pollId: pollId,
   });

   let pseudo;
   if (isError) {
      pseudo = <p>{error}</p>;
   } else if (isLoading) {
      pseudo = <p>Loading...</p>;
   } else if (isSuccess) {
      pseudo = <h1>{logged.entities[logged.ids].pseudo}</h1>;
   }

   return (
      <Stack>
         <ChoiceDialog />
         {pseudo}
         <Grid container>
            <Grid item xs={2}>
               <ParticipantList pollId={pollId} />
            </Grid>
            <Grid item xs={10}>
               <ChoiceList pollId={pollId} />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
