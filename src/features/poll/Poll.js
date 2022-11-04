import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

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

   const {
      data: participant,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetParticipantQuery({
      userId: userId,
      pollId: pollId,
   });

   useEffect(() => {
      dispatch(setParticipantId({ participantId: participant?.ids[0] }));
   }, [dispatch, participant]);

   let pseudo;
   if (isError) {
      pseudo = <p>{error}</p>;
   } else if (isLoading) {
      pseudo = <p>Loading...</p>;
   } else if (isSuccess) {
      pseudo = <h1>{participant.entities[participant.ids].pseudo}</h1>;
   }

   return (
      <section className="poll">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col  w-2/3 mt-4">
               <div className="flex items-center justify-between">
                  <p className="text-lg">Poll Name</p>
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="button"
                     onClick={() => setShowChoiceModal(true)}
                  >
                     Add Choice
                  </button>
               </div>
               <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2">
                     <ParticipantList pollId={pollId} />
                  </div>
                  <div className="col-span-10">
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

export default Poll;
