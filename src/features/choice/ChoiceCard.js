import React, { useState } from "react";
import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

import { useDeleteChoiceMutation } from "./choiceApiSlice";
import VoteButtons from "../vote/VoteButtons";
import ChoiceDialog from "./ChoiceDialog";

const ChoiceCard = ({ choice }) => {
   const [deleteChoice] = useDeleteChoiceMutation();

   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   return (
      <div className="flex flex-col bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <div className="flex items-center justify-between">
            <p className="text-lg">{choice?.name}</p>
            <div className="flex items-center space-x-2">
               <button onClick={() => setShowChoiceModal(true)}>
                  <PencilIcon className="h-6 w-6" />
               </button>
               <button onClick={() => deleteChoice({ id: choice?.id })}>
                  <TrashIcon className="h-6 w-6" />
               </button>
            </div>
         </div>
         <div className="py-2">
            <p className="text-gray-500">{choice?.description}</p>
         </div>
         <VoteButtons
            choiceId={choice?.id}
            participantId={choice?.participant}
         />
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            choice={choice}
         />
      </div>
   );
};

ChoiceCard.propTypes = {
   choiceId: PropTypes.number,
   participantId: PropTypes.number,
   name: PropTypes.string,
   description: PropTypes.string,
};

export default ChoiceCard;
