import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetUserQuery, useUpdateUserMutation } from "./userApiSlice";
import { logOut, selectCurrentUser } from "../auth/authSlice";

/**
 * Component to edit user data
 * @returns {JSX.Element}
 * @constructor
 */
const Account = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser);

   const [updateUser] = useUpdateUserMutation();

   const {
      data: user,
      isSuccess,
      isLoading,
      isError,
      error,
   } = useGetUserQuery({ id: currentUser });

   const handleSubmit = async (e) => {
      e.preventDefault();

      const first_name = e.target["first_name"].value;
      const last_name = e.target["last_name"].value;

      await updateUser({
         id: currentUser,
         email: e.target["email"].value,
         username: e.target["username"].value,
         first_name: first_name ? first_name : null,
         last_name: last_name ? last_name : null,
      });
   };

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
                  <form onSubmit={handleSubmit}>
                     <input
                        name="email"
                        type="email"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email"
                        defaultValue={user?.entities[user?.ids[0]].email}
                        autoComplete="off"
                        required
                     />
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
                     />
                     <input
                        name="last_name"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 mb-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Last Name"
                        defaultValue={user?.entities[user?.ids[0]].last_name}
                        autoComplete="off"
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
