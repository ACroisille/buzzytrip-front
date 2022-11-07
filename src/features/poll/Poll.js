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
} from "../participant/participantSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { useGetPollQuery } from "./pollApiSlice";
import UpdatePollDialog from "./UpdatePollDialog";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const Poll = () => {
   const dispatch = useDispatch();

   const { poll_id: pollId } = useParams();
   const currentUser = useSelector(selectCurrentUser);
   const participantId = useSelector(selectParticipantId);

   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   const [showPollSettingsModal, setShowPollSettingsModal] = useState(false);
   const handlePollSettingsModalOnClose = () => setShowPollSettingsModal(false);

   const {
      data: poll,
      isError,
      isSuccess,
      isLoading,
      error,
   } = useGetPollQuery({ pollId: pollId });

   const { data: participant } = useGetParticipantQuery({
      userId: currentUser,
      pollId: pollId,
   });

   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
   }, [dispatch, participant]);

   let pollName;
   if (isError) {
      pollName = error;
   } else if (isLoading) {
      pollName = "Loading...";
   } else if (isSuccess) {
      pollName = poll.entities[poll.ids[0]].name;
   }

   return (
      <section className="poll">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col  w-2/3 mt-4">
               <div className="flex items-center justify-between">
                  <p className="text-2xl">{pollName}</p>
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
                        participantId={participantId}
                     />
                  </div>
               </div>
            </div>
         </div>
         <ChoiceDialog
            visible={showChoiceModal}
            onClose={handleChoiceModalOnClose}
            participantId={participantId}
         />
         <UpdatePollDialog
            visible={showPollSettingsModal}
            onClose={handlePollSettingsModalOnClose}
            participantId={participantId}
            poll={poll?.entities[poll.ids[0]]}
         />
      </section>
   );
};

Poll.propTypes = {
   name: PropTypes.string,
};

export default Poll;
