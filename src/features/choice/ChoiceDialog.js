import React from "react";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { selectParticipantId } from "../participant/participantSlice";
import {
   useAddChoiceMutation,
   useUpdateChoiceMutation,
   useDeleteChoiceMutation,
} from "./choiceApiSlice";

/**
 * Modal Component to create and update choices
 * @param visible
 * @param onClose
 * @param choice
 * @param cacheData
 * @returns {JSX.Element|null}
 * @constructor
 */
function ChoiceDialog({ visible, onClose, choice = null, cacheData }) {
   const currentParticipant = useSelector(selectParticipantId);

   const [addChoice] = useAddChoiceMutation();
   const [updateChoice] = useUpdateChoiceMutation();
   const [deleteChoice] = useDeleteChoiceMutation();

   const handleOnClose = (e) => {
      if (e.target.id === "choiceModal") onClose();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const description = e.target["description"].value;
      const link = e.target["link"].value;

      const body = {
         name: e.target["name"].value,
         description: description ? description : null,
         link: link ? link : null,
      };

      if (choice) {
         // If the choice already exists, update it
         await updateChoice({
            id: choice.id,
            ...body,
         });
      } else {
         // Else, create it
         await addChoice({
            participant: currentParticipant,
            ...body,
         });
      }

      onClose();
   };

   const handleDeleteChoice = () => {
      deleteChoice({ id: choice?.id, ...cacheData });
   };

   const deleteButton = choice ? (
      <button
         className="inline-block px-6 py-2.5 bg-white text-red-500 border border-red-500 font-medium leading-tight uppercase rounded shadow-md hover:text-white hover:bg-red-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
         type="button"
         onClick={() => handleDeleteChoice()}
      >
         Delete
      </button>
   ) : null;

   if (!visible) return null;
   return (
      <div
         id="choiceModal"
         className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
         onClick={handleOnClose}
      >
         <div className="bg-white p-2 rounded shadow-md w-1/2">
            <div className="flex items-center justify-between w-full mb-3">
               <p className="text-lg">Choice Settings</p>
               <button onClick={() => onClose()}>
                  <XMarkIcon className="h-6 w-6" />
               </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
               <input
                  name="name"
                  type="text"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  defaultValue={choice?.name}
                  autoComplete="off"
                  required
               />
               <textarea
                  name="description"
                  placeholder="Description"
                  className="form-control resize-y block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  autoComplete="off"
                  defaultValue={choice?.description}
               />
               <input
                  name="link"
                  type="url"
                  className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Url"
                  defaultValue={choice?.link}
                  autoComplete="off"
               />
               <button
                  className="inline-block px-6 py-2.5 mb-2 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="submit"
               >
                  Save
               </button>
               {deleteButton}
            </form>
         </div>
      </div>
   );
}

export default ChoiceDialog;
