import React from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useAddPollMutation } from "./pollApiSlice";

/**
 * Modal Component to create a new Poll
 * @param visible
 * @param onClose
 * @param userId
 * @returns {JSX.Element|null}
 * @constructor
 */
function CreatePollDialog({ visible, onClose, userId }) {
   const navigate = useNavigate();
   const [addPoll] = useAddPollMutation();

   const handleOnClose = (e) => {
      if (e.target.id === "pollModal") onClose();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const description = e.target["description"].value;
      const pseudo = e.target["pseudo"].value;

      const poll = await addPoll({
         name: e.target["name"].value,
         description: description ? description : null,
         created_by: userId,
         pseudo: pseudo ? pseudo : null,
      });

      onClose();
      navigate(`/poll/${poll.data.id}`);
   };

   if (!visible) return null;
   return (
      <div
         id="pollModal"
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
                  name="name"
                  type="text"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  autoComplete="off"
                  required
               />
               <textarea
                  name="description"
                  placeholder="Description"
                  className="form-control resize-y block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  autoComplete="off"
               />
               <input
                  name="pseudo"
                  type="text"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Pseudo"
                  autoComplete="off"
               />
               <button
                  className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="submit"
               >
                  Create Poll
               </button>
            </form>
         </div>
      </div>
   );
}

export default CreatePollDialog;
