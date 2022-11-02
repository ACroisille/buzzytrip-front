import React from "react";
import { Link } from "react-router-dom";

function Header() {
   return (
      <header className="flex flex-wrap justify-center bg-violet-500 p-2">
         <span className="flex text-white	font-semibold text-3xl tracking-tight">
            PollTrip
         </span>
         <nav className="flex grow justify-center">
            <a
               href="/home"
               className="flex items-center text-lg text-violet-200 hover:text-white"
            >
               Home
            </a>
         </nav>
         <div className="flex ">
            <a
               href="/signup"
               className="flex items-center text-lg px-4 text-violet-200 hover:text-white"
            >
               Signup
            </a>
            <a
               href="/login"
               className="flex items-center text-lg px-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white"
            >
               Login
            </a>
         </div>
      </header>
   );
}

export default Header;
