import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";

import ChoiceList from "../choice/ChoiceList";
import ChoiceDialog from "../choice/ChoiceDialog";
import ParticipantList from "../participant/ParticipantList";

import { useGetParticipantQuery } from "../participant/participantApiSlice";
import {
   selectParticipantId,
   setParticipantId,
} from "../participant/participantSlice";

const Poll = () => {
   const dispatch = useDispatch();

   const { poll_id: pollId } = useParams();
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   const userId = decoded?.user_id;

   const participantId = useSelector(selectParticipantId);
   const [showChoiceModal, setShowChoiceModal] = useState(false);
   const handleChoiceModalOnClose = () => setShowChoiceModal(false);

   const { data: participant } = useGetParticipantQuery({
      userId: userId,
      pollId: pollId,
   });

   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
   }, [dispatch, participant]);

   return (
      <section className="poll">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col  w-2/3 mt-4">
               <div className="flex items-center justify-between">
                  <p className="text-2xl">Poll Name</p>
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="button"
                     onClick={() => setShowChoiceModal(true)}
                  >
                     Add Choice
                  </button>
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
         />
      </section>
   );
};

Poll.propTypes = {
   name: PropTypes.string,
};

export default Poll;
