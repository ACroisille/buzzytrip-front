import React, { useState } from "react";
import PropTypes from "prop-types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import VoteButtons from "../vote/VoteButtons";
import ChoiceDialog from "./ChoiceDialog";

import { ReactComponent as ChoiceDefaultPicture } from "../../assets/undraw_house_searching_re_stk8.svg";

/**
 * Compnonent that displays main data about choices
 * @param pollId
 * @param currentPage
 * @param choice
 * @param index
 * @returns {JSX.Element}
 * @constructor
 */
const ChoiceCard = ({ choice, cacheData }) => {
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
            <button
               className="inline-block px-2 py-1 text-white bg-violet-500 text-sm leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
               type="button"
            >
               check it
            </button>
         </a>
      </div>
   ) : null;

   return (
      <div className="flex flex-col h-64 bg-white rounded shadow-md p-2 hover:bg-violet-100">
         <div className={"flex h-32 justify-center"}>
            <ChoiceDefaultPicture />
         </div>
         <div className="flex items-center justify-between mt-2">
            <p className="text-base truncate">{choice?.name}</p>
            <div className="flex items-center space-x-2">
               <button onClick={() => setShowChoiceModal(true)}>
                  <EllipsisVerticalIcon className="h-6 w-6" />
               </button>
            </div>
         </div>
         <div className="mb-auto">
            {description}
            {link}
         </div>
         <VoteButtons choiceId={choice?.id} votes={choice?.votes} />
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            choice={choice}
            cacheData={cacheData}
         />
      </div>
   );
};

ChoiceCard.propTypes = {
   choice: PropTypes.object,
};

export default ChoiceCard;
