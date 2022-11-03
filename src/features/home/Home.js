import jwt_decode from "jwt-decode";

import { useGetUserQuery } from "../user/userApiSlice";
import PollList from "./PollList";
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
   const token = sessionStorage.getItem("access");
   const decoded = token ? jwt_decode(token) : undefined;
   const { data: user } = useGetUserQuery({ id: decoded?.user_id });

   return (
      <section className="home">
         <div className="flex flex-col mt-4 mx-80">
            <div className="flex items-center justify-between">
               <p className="text-lg">My Polls</p>
               <Link
                  className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  to={`/poll/create`}
               >
                  New Poll
               </Link>
            </div>
            <PollList userId={decoded?.user_id} />
         </div>
      </section>
   );
};
export default Home;
