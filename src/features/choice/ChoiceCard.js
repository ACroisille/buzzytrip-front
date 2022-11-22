import React, { useState } from "react";
import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

import { useDeleteChoiceMutation } from "./choiceApiSlice";
import VoteButtons from "../vote/VoteButtons";
import ChoiceDialog from "./ChoiceDialog";

/**
 * Compnonent that displays main data about choices
 * @param choice
 * @returns {JSX.Element}
 * @constructor
 */
const ChoiceCard = ({ choice }) => {
   const [deleteChoice] = useDeleteChoiceMutation();

   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   const description = choice?.description ? (
      <div className="py-2">
         <p className="text-gray-500">{choice?.description}</p>
      </div>
   ) : null;

   const link = choice?.link ? (
      <div className="py-2">
         <a
            href={choice?.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
         >
            {choice?.link}
         </a>
      </div>
   ) : null;

   return (
      <div className="flex flex-col bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <div className="flex items-center justify-between">
            <p className="text-xl">{choice?.name}</p>
            <div className="flex items-center space-x-2">
               <button onClick={() => setShowChoiceModal(true)}>
                  <PencilIcon className="h-6 w-6" />
               </button>
               <button onClick={() => deleteChoice({ id: choice?.id })}>
                  <TrashIcon className="h-6 w-6" />
               </button>
            </div>
         </div>
         {description}
         {link}
         <VoteButtons choiceId={choice?.id} votes={choice?.votes} />
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            choice={choice}
         />
      </div>
   );
};

ChoiceCard.propTypes = {
   choice: PropTypes.object,
};

export default ChoiceCard;
