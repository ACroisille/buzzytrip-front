import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PublicPicture } from "../assets/undraw_travelers_re_y25a.svg";

/**
 * Public component
 * @returns {JSX.Element}
 * @constructor
 */
const Public = () => {
   const navigate = useNavigate();

   return (
      <section className="public">
         <div className={"flex flex-row"}>
            <div className={"flex w-full"}>
               <div className={"w-1/2 p-40 "}>
                  <h1 className={"text-5xl pb-5 pr-20"}>
                     Plan your group trips with
                     <b> no stress </b>
                  </h1>
                  <p className={"text-gray-600 pr-40 pb-5"}>
                     Helps you to sync with your friends to pick the right
                     rental for your holidays before it's too late.
                  </p>
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                     type="button"
                     onClick={() => {
                        navigate("/home");
                     }}
                  >
                     Get Started
                  </button>
               </div>
               <div className={"w-1/2 pr-40 py-20"}>
                  <PublicPicture />
               </div>
            </div>
         </div>
      </section>
   );
};
export default Public;
