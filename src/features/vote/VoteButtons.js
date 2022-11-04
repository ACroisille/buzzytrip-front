import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

import {
   useAddVoteMutation,
   useGetChoiceVotesQuery,
   useDeleteVoteMutation,
} from "./voteApiSlice";
import {
   selectParticipantVotesCount,
   setParticipantVotes,
} from "../participant/participantSlice";

function VoteButtons({ choiceId, participantId }) {
   const dispatch = useDispatch();
   const voteCount = useSelector(selectParticipantVotesCount);
   const {
      data: votes,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetChoiceVotesQuery({ choiceId });

   useEffect(() => {
      const participantVotesCount = votes?.ids
         .map((id) => votes?.entities[id])
         .filter((v) => v?.participant === participantId).length;
      dispatch(setParticipantVotes({ [choiceId]: participantVotesCount }));
   }, [dispatch, votes, choiceId, participantId]);

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

   const handleUpVoteClick = () => {
      const participantUpVote = votes.ids
         .map((id) => votes.entities[id])
         .filter((v) => v.participant === participantId && v.is_pos === true);

      if (participantUpVote.length > 0) {
         const voteId = participantUpVote[0].id;
         deleteVote({ id: voteId });
      } else {
         addVote({
            choice: choiceId,
            participant: participantId,
            is_pos: true,
         });
      }
   };

   return (
      <div>
         <button
            disabled={upVotesCount === 0 && voteCount >= 3}
            aria-label="Vote for it"
            onClick={handleUpVoteClick}
         >
            <div className="flex flex-row gap-1 items-center">
               <HandThumbUpIcon className="h-6 w-6" />
               <p>{upVotesCount}</p>
            </div>
         </button>
      </div>
   );
}

export default VoteButtons;
