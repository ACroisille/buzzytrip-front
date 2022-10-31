import { useAddVoteMutation, useGetChoiceVotesQuery } from "./voteApiSlice";
import { CardActions, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

function VoteButtons({ choiceId, loggedParticipantId }) {
   const {
      data: votes,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetChoiceVotesQuery({ choiceId });

   const [addVote] = useAddVoteMutation();

   let posVotesCount;
   if (isError) {
      posVotesCount = error;
   } else if (isLoading) {
      posVotesCount = "Loading...";
   } else if (isSuccess) {
      const voteArray = votes.ids.map((id) => votes.entities[id]);
      posVotesCount = voteArray.filter((v) => v.is_pos === true).length;
   }

   return (
      <CardActions>
         <IconButton
            aria-label="Vote for it"
            onClick={() =>
               addVote({
                  choice: choiceId,
                  participant: loggedParticipantId,
                  is_pos: true,
               })
            }
         >
            <ThumbUpIcon />
            {posVotesCount}
         </IconButton>
      </CardActions>
   );
}

export default VoteButtons;
