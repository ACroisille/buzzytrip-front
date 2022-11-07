import React from "react";
import { useGetUserQuery } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../auth/authSlice";

const Account = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser);

   const {
      data: user,
      isSuccess,
      isLoading,
      isError,
      error,
   } = useGetUserQuery({ id: currentUser });

   let content;
   if (isError) {
      content = <p>Error...</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <section className="account">
            <div>
               <button
                  className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  type="button"
                  onClick={() => {
                     dispatch(logOut());
                     navigate("/login");
                  }}
               >
                  Logout
               </button>
            </div>
         </section>
      );
   }

   return content;
};

export default Account;
