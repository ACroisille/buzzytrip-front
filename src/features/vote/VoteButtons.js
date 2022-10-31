import {
   useAddVoteMutation,
   useGetChoiceVotesQuery,
   useDeleteVoteMutation,
} from "./voteApiSlice";
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
   const [deleteVote] = useDeleteVoteMutation();

   let upVotesCount;
   if (isError) {
      upVotesCount = error;
   } else if (isLoading) {
      upVotesCount = "Loading...";
   } else if (isSuccess) {
      const voteArray = votes.ids.map((id) => votes.entities[id]);
      upVotesCount = voteArray.filter((v) => v.is_pos === true).length;
   }

   const handleUpVoteClick = (event) => {
      const loggedParticipantUpVote = votes.ids
         .map((id) => votes.entities[id])
         .filter(
            (v) => v.participant === loggedParticipantId && v.is_pos === true
         );

      if (loggedParticipantUpVote.length > 0) {
         const voteId = loggedParticipantUpVote[0].id;
         deleteVote({ id: voteId });
      } else {
         addVote({
            choice: choiceId,
            participant: loggedParticipantId,
            is_pos: true,
         });
      }
   };

   return (
      <CardActions>
         <IconButton aria-label="Vote for it" onClick={handleUpVoteClick}>
            <ThumbUpIcon />
            {upVotesCount}
         </IconButton>
      </CardActions>
   );
}

export default VoteButtons;
