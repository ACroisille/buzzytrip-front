import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import PollList from "./PollList";

const Home = () => {
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   //const { data: user } = useGetUserQuery({ id: decoded?.user_id });

   return (
      <section className="home">
         <div className="flex justify-center mt-4">
            <div className="flex flex-col w-2/3">
               <div className="flex items-center justify-between">
                  <p className="text-2xl">My Polls</p>
                  <Link
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     to={`/poll/create`}
                  >
                     New Poll
                  </Link>
               </div>
               <PollList userId={decoded?.user_id} />
            </div>
         </div>
      </section>
   );
};
export default Home;
