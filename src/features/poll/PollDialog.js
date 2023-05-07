import React from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useAddPollMutation, useUpdatePollMutation } from "./pollApiSlice";
import {
   useDeleteParticipantMutation,
   useUpdateParticipantMutation,
} from "../participant/participantApiSlice";

/**
 * Modal Component to update Poll
 * @param visible
 * @param onClose
 * @param participant
 * @param poll
 * @returns {JSX.Element|null}
 * @constructor
 */
function PollDialog({ visible, onClose, userId, participant, poll }) {
   const navigate = useNavigate();

   const [addPoll] = useAddPollMutation();
   const [updatePoll] = useUpdatePollMutation();
   const [updateParticipant] = useUpdateParticipantMutation();
   const [deleteParticipant] = useDeleteParticipantMutation();

   const handleOnClose = (e) => {
      if (e.target.id === "pollDialog") onClose();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const name = e.target["name"].value;
      const pseudo = e.target["pseudo"].value;
      const description = e.target["description"].value;

      if (userId && !participant && !poll) {
         // If the poll doesn't exists yet, create it
         const poll = await addPoll({
            name: e.target["name"].value,
            description: description ? description : null,
            created_by: userId,
            pseudo: pseudo ? pseudo : null,
         });

         onClose();
         navigate(`/poll/${poll.data.id}`);
      } else {
         if (participant) {
            // Update participant infos
            let participantDraft = {
               id: participant.id,
            };

            if (participant.pseudo !== pseudo) {
               // If participant pseudo has changed, update it
               participantDraft.pseudo = pseudo ? pseudo : null;
            }

            if (Object.keys(participantDraft).length > 1) {
               await updateParticipant(participantDraft);
            }
         }

         if (poll) {
            // Update poll infos
            let pollDraft = {
               id: poll?.id,
            };

            if (poll.name !== name) {
               // If poll name has changed, update it
               pollDraft.name = name;
            }
            if (poll.description !== description) {
               // If poll discription has changed, update it
               pollDraft.description = description;
            }

            if (Object.keys(pollDraft).length > 1) {
               await updatePoll(pollDraft);
            }
         }

         onClose();
      }
   };

   const handleQuitPoll = async () => {
      await deleteParticipant({ id: participant.id });
      onClose();
      navigate("/home");
   };

   if (!visible) return null;

   let quitPoll = null;
   if (poll && participant) {
      quitPoll = (
         <div className="flex items-center justify-center w-full mt-3">
            <button
               className="inline-block px-6 py-2.5 bg-white text-red-500 border border-red-500 font-medium leading-tight uppercase rounded shadow-md hover:text-white hover:bg-red-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
               type="button"
               onClick={handleQuitPoll}
            >
               Quit Poll
            </button>
         </div>
      );
   }

   return (
      <div
         id="pollDialog"
         className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
         onClick={handleOnClose}
      >
         <div className="bg-white p-2 rounded shadow-md w-1/2">
            <div className="flex items-center justify-between w-full mb-3">
               <p className="text-xl font-bold">Settings</p>
               <button onClick={() => onClose()}>
                  <XMarkIcon className="h-6 w-6" />
               </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
               <div className="border-b-2">
                  <p className="text-lg font-semibold mb-1">Participant</p>
                  <div className="pb-2">
                     <label for="pseudo">Pseudo</label>
                     <input
                        name="pseudo"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        defaultValue={participant?.pseudo}
                        autoComplete="off"
                        required
                     />
                  </div>
               </div>
               <div>
                  <p className="text-lg font-semibold mb-1">Poll</p>
                  <div>
                     <label for="name">Name</label>
                     <input
                        name="name"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        defaultValue={poll?.name}
                        autoComplete="off"
                        required
                     />
                     <label for="description">Description</label>
                     <textarea
                        name="description"
                        className="form-control resize-y block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        defaultValue={poll?.description}
                        autoComplete="off"
                     />
                     <div className="flex space-x-4">
                        <div className="flex flex-col">
                           <label for="start_date">Start Date</label>
                           <input
                              className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              name="start_date"
                              type="date"
                           />
                        </div>
                        <div className="flex flex-col">
                           <label for="end_date">End Date</label>
                           <input
                              className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              name="end_date"
                              type="date"
                           />
                        </div>
                        <div className="flex flex-col">
                           <label for="closing_time">Closing Time</label>
                           <input
                              className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              name="closing_time"
                              type="datetime-local"
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <button
                  className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="submit"
               >
                  save
               </button>
            </form>
            {quitPoll}
         </div>
      </div>
   );
}

export default PollDialog;
