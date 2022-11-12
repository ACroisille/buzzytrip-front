import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import ParticipantList from "../participant/ParticipantList";

import { useGetParticipantQuery } from "../participant/participantApiSlice";
import {
   selectParticipantId,
   setParticipantId,
   setParticipantVotes,
} from "../participant/participantSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetPollQuery } from "./pollApiSlice";
import UpdatePollDialog from "./UpdatePollDialog";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import WelcomeDialog from "../participant/WelcomeDialog";

const Poll = () => {
   const dispatch = useDispatch();

   const { poll_id: pollId } = useParams();
   const currentUser = useSelector(selectCurrentUser);
   const currentParticipant = useSelector(selectParticipantId);

   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   const [showPollSettingsModal, setShowPollSettingsModal] = useState(false);
   const handlePollSettingsModalOnClose = () => setShowPollSettingsModal(false);

   const [showWelcomeModal, setShowWelcomeModal] = useState(false);
   const handleShowWelcomeModalOnClose = () => setShowWelcomeModal(false);

   const { data: poll, isSuccess: pollSuccess } = useGetPollQuery({
      pollId: pollId,
   });

   const { data: participant, isSuccess: participantSuccess } =
      useGetParticipantQuery({
         userId: currentUser,
         pollId: pollId,
      });

   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
      dispatch(setParticipantVotes(null));
   }, [dispatch, participant]);

   useEffect(() => {
      // console.log(pollSuccess, participantSuccess, participant?.ids[0]);
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
               <div className="grid grid-cols-12 gap-2 mt-4">
                  <div className="col-span-3">
                     <ParticipantList pollId={pollId} />
                  </div>
                  <div className="col-span-9">
                     <ChoiceList
                        pollId={pollId}
                        participantId={currentParticipant}
                     />
                  </div>
               </div>
            </div>
         </div>
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            participantId={currentParticipant}
         />
         <UpdatePollDialog
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
