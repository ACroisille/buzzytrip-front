import React from "react";
import { Link } from "react-router-dom";

function Header() {
   /*
  const welcome = user
      ? `Welcome ${user.entities[decoded?.user_id].username}!`
      : "Home!";
  */
   return (
      <header className="flex flex-wrap justify-center bg-violet-500 py-2 px-4">
         <span className="flex text-white	font-semibold text-3xl tracking-tight">
            PollTrip
         </span>
         <nav className="flex grow justify-center">
            <Link
               to="/home"
               className="flex items-center text-lg text-violet-200 hover:text-white"
            >
               Home
            </Link>
         </nav>
         <div className="flex ">
            <Link
               to="/signup"
               className="flex items-center text-lg px-4 text-violet-200 hover:text-white"
            >
               Signup
            </Link>
            <Link
               to="/login"
               className="flex items-center uppercase px-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-violet-500 hover:bg-white"
            >
               Login
            </Link>
         </div>
      </header>
   );
}

export default Header;
