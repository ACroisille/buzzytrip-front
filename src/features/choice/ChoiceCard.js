import React from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useDeleteChoiceMutation } from "./choiceApiSlice";
import VoteButtons from "../vote/VoteButtons";

const ChoiceCard = ({ choiceId, participantId, name, description }) => {
   const [deleteChoice] = useDeleteChoiceMutation();

   return (
      <div className="flex flex-col bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <div className="flex items-center justify-between">
            <p className="text-lg">{name}</p>
            <div>
               <button onClick={() => deleteChoice({ id: choiceId })}>
                  <XMarkIcon className="h-6 w-6" />
               </button>
            </div>
         </div>
         <div className="py-2">
            <p className="text-gray-500">{description}</p>
         </div>
         <VoteButtons choiceId={choiceId} participantId={participantId} />
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
