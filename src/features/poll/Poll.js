import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import jwt_decode from "jwt-decode";

import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import ParticipantList from "../participant/ParticipantList";

import { useGetParticipantQuery } from "../participant/participantApiSlice";
import {
   selectParticipantId,
   setParticipantId,
} from "../participant/participantSlice";

function Poll() {
   const dispatch = useDispatch();

   const { poll_id: pollId } = useParams();
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   const userId = decoded?.user_id;

   const participantId = useSelector(selectParticipantId);

   const {
      data: participant,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetParticipantQuery({
      userId: userId,
      pollId: pollId,
   });

   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
   }, [dispatch, participant]);

   let pseudo;
   if (isError) {
      pseudo = <p>{error}</p>;
   } else if (isLoading) {
      pseudo = <p>Loading...</p>;
   } else if (isSuccess) {
      pseudo = <h1>{participant.entities[participant.ids].pseudo}</h1>;
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
               <ChoiceList pollId={pollId} participantId={participantId} />
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Poll;
