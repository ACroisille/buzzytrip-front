import React, { useState } from "react";
import { useSelector } from "react-redux";

import PollList from "../features/poll/PollList";

import { selectCurrentUser } from "../features/auth/authSlice";
import CreatePollDialog from "../features/poll/CreatePollDialog";

const Home = () => {
   const currentUser = useSelector(selectCurrentUser);

   const [showPollModal, setShowPollModal] = useState(false);
   const handlePollModalOnClose = () => setShowPollModal(false);

   return (
      <section className="home">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col w-2/3">
               <div className="flex items-center justify-between">
                  <p className="text-2xl">My Polls</p>
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="button"
                     onClick={() => setShowPollModal(true)}
                  >
                     New Poll
                  </button>
               </div>
               <PollList userId={currentUser} />
            </div>
         </div>
         <CreatePollDialog
            visible={showPollModal}
            onClose={handlePollModalOnClose}
         />
      </section>
   );
};
export default Home;
