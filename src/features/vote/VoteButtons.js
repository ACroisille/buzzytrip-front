import React from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useAddVoteMutation, useDeleteVoteMutation } from "./voteApiSlice";
import { useSelector } from "react-redux";
import {
   selectParticipantId,
   selectParticipantVotesCount,
} from "../participant/participantSlice";

function VoteButtons({ choiceId, votes }) {
   const currentParticipant = useSelector(selectParticipantId);
   const cpVoteCount = useSelector(selectParticipantVotesCount);

   const [addVote] = useAddVoteMutation();
   const [deleteVote] = useDeleteVoteMutation();

   const cpUpVotes = votes?.filter(
      (v) => v.participant === currentParticipant && v.is_pos === true
   );

   const handleUpVoteClick = () => {
      if (cpUpVotes.length > 0) {
         const voteId = cpUpVotes[0].id;
         deleteVote({ id: voteId, choiceId: choiceId });
      } else {
         addVote({
            choice: choiceId,
            participant: currentParticipant,
            is_pos: true,
         });
      }
   };

   return (
      <div>
         <button
            disabled={cpUpVotes.length === 0 && cpVoteCount >= 1}
            aria-label="Vote for it"
            onClick={handleUpVoteClick}
         >
            <div className="flex flex-row gap-1 items-center">
               <HandThumbUpIcon className={`h-6 w-6`} />
               <p>{votes.length}</p>
            </div>
         </button>
      </div>
   );
}

export default VoteButtons;
