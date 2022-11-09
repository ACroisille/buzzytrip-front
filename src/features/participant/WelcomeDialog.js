import React from "react";
import { useNavigate } from "react-router-dom";

import { useAddParticipantMutation } from "./participantApiSlice";

const WelcomeDialog = ({ visible, onClose, poll, userId }) => {
   const navigate = useNavigate();
   const [addParticipant] = useAddParticipantMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();

      const pseudo = e.target["pseudo"].value;

      await addParticipant({
         user: userId,
         poll: poll?.id,
         pseudo: pseudo ? pseudo : null,
      });

      onClose();
   };

   const handleDecline = async () => {
      onClose();
      navigate("/home");
   };

   if (!visible) return null;
   return (
      <div
         id="welcomeModal"
         className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
      >
         <div className="bg-white p-2 rounded shadow-md w-1/2">
            <div className="flex items-center justify-between w-full mb-3">
               <p className="text-lg">Do you want to join this poll ?</p>
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
                  autoComplete="off"
               />
               <div className="space-x-3">
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="submit"
                  >
                     join
                  </button>
                  <button
                     className="inline-block px-6 py-2.5 bg-white text-red-500 border border-red-500 font-medium leading-tight uppercase rounded shadow-md hover:text-white hover:bg-red-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="button"
                     onClick={handleDecline}
                  >
                     Decline
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default WelcomeDialog;
