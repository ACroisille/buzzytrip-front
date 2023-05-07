import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import WelcomeDialog from "../participant/WelcomeDialog";
import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import PollDialog from "./PollDialog";

import { useGetPollQuery } from "./pollApiSlice";
import { useGetParticipantQuery } from "../participant/participantApiSlice";

import {
   selectParticipantId,
   setParticipantId,
} from "../participant/participantSlice";
import { selectCurrentUser } from "../auth/authSlice";

/**
 * Component Poll
 * @returns {JSX.Element}
 * @constructor
 */
const Poll = () => {
   const dispatch = useDispatch();

   const { poll_id: pollId } = useParams();
   const currentUser = useSelector(selectCurrentUser);
   const currentParticipant = useSelector(selectParticipantId);

   // Diplay and Hide Choice Modal Component
   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   // Diplay and Hide Poll Modal Component
   const [showPollSettingsModal, setShowPollSettingsModal] = useState(false);
   const handlePollSettingsModalOnClose = () => setShowPollSettingsModal(false);

   // Diplay and Hide Welcome Modal Component
   const [showWelcomeModal, setShowWelcomeModal] = useState(false);
   const handleShowWelcomeModalOnClose = () => setShowWelcomeModal(false);

   // Get Poll Details
   const { data: poll, isSuccess: pollSuccess } = useGetPollQuery({
      pollId: pollId,
   });

   // Get Current Participant Details
   const { data: participant, isSuccess: participantSuccess } =
      useGetParticipantQuery({
         userId: currentUser,
         pollId: pollId,
      });

   // Dispatch current participant Id
   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
   }, [dispatch, participant]);

   // Show Welcome Modal if participant is not in this poll
   useEffect(() => {
      if (pollSuccess && participantSuccess && !participant?.ids[0]) {
         setShowWelcomeModal(true);
      }
   }, [pollSuccess, participantSuccess, participant]);

   return (
      <section className="poll">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col  w-2/3 mt-4">
               <div className="flex items-center justify-between">
                  <p className="text-2xl">{poll?.entities[poll.ids[0]].name}</p>
                  <div className="flex flex-row space-x-3">
                     <button
                        className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => setShowChoiceModal(true)}
                     >
                        New Choice
                     </button>
                     <button>
                        <Cog6ToothIcon
                           className="h-10 w-10"
                           onClick={() => setShowPollSettingsModal(true)}
                        />
                     </button>
                  </div>
               </div>
               <div className="mt-4">
                  <ChoiceList pollId={pollId} />
               </div>
            </div>
         </div>
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            participantId={currentParticipant}
         />
         <PollDialog
            visible={showPollSettingsModal}
            onClose={handlePollSettingsModalOnClose}
            participant={participant?.entities[participant.ids[0]]}
            poll={poll?.entities[poll.ids[0]]}
         />
         <WelcomeDialog
            visible={showWelcomeModal}
            onClose={handleShowWelcomeModalOnClose}
            poll={poll?.entities[poll.ids[0]]}
            userId={currentUser}
         />
      </section>
   );
};

Poll.propTypes = {
   name: PropTypes.string,
};

export default Poll;
