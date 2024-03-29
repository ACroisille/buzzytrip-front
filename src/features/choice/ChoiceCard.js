import React, { useState } from "react";
import PropTypes from "prop-types";
import { EllipsisVerticalIcon, UsersIcon } from "@heroicons/react/24/outline";
import { ReactComponent as ChoiceDefaultPicture } from "../../assets/undraw_house_searching_re_stk8.svg";

import VoteButtons from "../vote/VoteButtons";
import ChoiceDialog from "./ChoiceDialog";
import VotersDialog from "./VotersDialog";

/**
 * Compnonent that displays main data about choices
 * @param choice
 * @param cacheData
 * @returns {JSX.Element}
 * @constructor
 */
const ChoiceCard = ({ choice, cacheData }) => {
   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   const [showVotersModal, setShowVotersModal] = useState(false);
   const handleVotersModalOnClose = () => setShowVotersModal(false);

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
         <div className={"flex justify-between"}>
            <VoteButtons choiceId={choice?.id} votes={choice?.votes} />
            <button
               disabled={choice?.votes.length <= 0}
               onClick={() => setShowVotersModal(true)}
               className={"group"}
            >
               <UsersIcon className="h-6 w-6 group-disabled:fill-gray-400 " />
            </button>
         </div>
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            choice={choice}
            cacheData={cacheData}
         />
         <VotersDialog
            visible={showVotersModal}
            onClose={handleVotersModalOnClose}
            choiceId={choice?.id}
         />
      </div>
   );
};

ChoiceCard.propTypes = {
   choice: PropTypes.object,
};

export default ChoiceCard;
