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
      content = <p>{error}</p>;
   } else if (isLoading) {
      content = <p>Loading...</p>;
   } else if (isSuccess) {
      content = (
         <section className="account">
            <div className="flex justify-center mt-4">
               <div className="flex flex-col w-1/4 ">
                  <p className="text-lg mb-2">User settings</p>
                  <form>
                     <input
                        name="username"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Username"
                        defaultValue={user?.entities[user?.ids[0]].username}
                        autoComplete="off"
                        required
                     />
                     <input
                        name="first_name"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="First Name"
                        defaultValue={user?.entities[user?.ids[0]].first_name}
                        autoComplete="off"
                        required
                     />
                     <input
                        name="last_name"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Last Name"
                        defaultValue={user?.entities[user?.ids[0]].last_name}
                        autoComplete="off"
                        required
                     />
                     <input
                        name="email"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email"
                        defaultValue={user?.entities[user?.ids[0]].email}
                        autoComplete="off"
                        required
                     />
                     <div className="flex flex-col items-center justify-center space-y-4">
                        <button
                           className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                           type="submit"
                        >
                           save
                        </button>
                        <button
                           className="inline-block px-6 py-2.5 bg-white text-red-500 border border-red-500 font-medium leading-tight uppercase rounded shadow-md hover:text-white hover:bg-red-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                           type="button"
                           onClick={() => {
                              dispatch(logOut());
                              navigate("/login");
                           }}
                        >
                           Logout
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }

   return content;
};

export default Account;
