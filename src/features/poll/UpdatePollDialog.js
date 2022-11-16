import React from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useUpdatePollMutation } from "./pollApiSlice";
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
function UpdatePollDialog({ visible, onClose, participant, poll }) {
   const navigate = useNavigate();

   const [updatePoll] = useUpdatePollMutation();
   const [updateParticipant] = useUpdateParticipantMutation();
   const [deleteParticipant] = useDeleteParticipantMutation();

   const handleOnClose = (e) => {
      if (e.target.id === "updatePollModal") onClose();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const pseudo = e.target["pseudo"].value;
      const description = e.target["description"].value;

      if (participant?.pseudo !== pseudo) {
         console.log("### UpdatePollDialog : pseudo");
         await updateParticipant({
            id: participant?.id,
            pseudo: pseudo ? pseudo : null,
         });
      }

      if (
         poll?.name !== e.target["name"].value ||
         poll?.description !== description
      ) {
         console.log("### UpdatePollDialog : informations");
         await updatePoll({
            id: poll?.id,
            name: e.target["name"].value,
            description: description ? description : null,
         });
      }

      onClose();
   };

   const handleQuitPoll = async () => {
      await deleteParticipant({ id: participant.id });
      onClose();
      navigate("/home");
   };

   if (!visible) return null;
   return (
      <div
         id="updatePollModal"
         className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
         onClick={handleOnClose}
      >
         <div className="bg-white p-2 rounded shadow-md w-1/2">
            <div className="flex items-center justify-between w-full mb-3">
               <p className="text-lg">Poll Settings</p>
               <button onClick={() => onClose()}>
                  <XMarkIcon className="h-6 w-6" />
               </button>
            </div>
            <form
               onSubmit={handleSubmit}
               className="flex items-center flex-col"
            >
               <input
                  name="pseudo"
                  type="text"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Pseudo"
                  defaultValue={participant?.pseudo}
                  autoComplete="off"
                  required
               />
               <input
                  name="name"
                  type="text"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  defaultValue={poll?.name}
                  autoComplete="off"
                  required
               />
               <textarea
                  name="description"
                  placeholder="Description"
                  className="form-control resize-y block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  defaultValue={poll?.description}
                  autoComplete="off"
               />
               <button
                  className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="submit"
               >
                  save
               </button>
            </form>
            <div className="flex items-center justify-center w-full mt-3">
               <button
                  className="inline-block px-6 py-2.5 bg-white text-red-500 border border-red-500 font-medium leading-tight uppercase rounded shadow-md hover:text-white hover:bg-red-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="button"
                  onClick={handleQuitPoll}
               >
                  Quit Poll
               </button>
            </div>
         </div>
      </div>
   );
}

export default UpdatePollDialog;
