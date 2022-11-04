import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRef = useRef();
   const errRef = useRef();

   const [username, setUser] = useState("");
   const [password, setPwd] = useState("");
   const [errMsg, setErrMsg] = useState("");

   const [login, { isLoading }] = useLoginMutation();

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      setErrMsg("");
   }, [username, password]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const userData = await login({ username, password }).unwrap();
         dispatch(setCredentials({ ...userData, username }));

         setUser("");
         setPwd("");
         navigate("/home");
      } catch (err) {
         if (!err?.originalStatus) {
            // isLoading: true until timeout occurs
            setErrMsg("No Server Response");
         } else if (err.originalStatus === 400) {
            setErrMsg("Missing Username or Password");
         } else if (err.originalStatus === 401) {
            setErrMsg("Unauthorized");
         } else {
            setErrMsg("Login Failed");
         }
         errRef.current.focus();
      }
   };

   const handleUserInput = (e) => setUser(e.target.value);
   const handlePwdInput = (e) => setPwd(e.target.value);

   let content;
   if (isLoading) {
      content = <h1>Loading...</h1>;
   } else {
      content = (
         <section className="login">
            <form
               onSubmit={handleSubmit}
               className="flex items-center flex-col"
            >
               <p className="justify-center m-4">
                  Please login to your account
               </p>
               <div className="mb-4">
                  <input
                     type="text"
                     className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                     placeholder="Username"
                     ref={userRef}
                     value={username}
                     onChange={handleUserInput}
                     autoComplete="off"
                     required
                  />
               </div>
               <div className="mb-4">
                  <input
                     type="password"
                     className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                     placeholder="Password"
                     id="password"
                     onChange={handlePwdInput}
                     value={password}
                     required
                  />
               </div>
               <p
                  ref={errRef}
                  className={
                     errMsg
                        ? "text-center mb-4 text-red-400 text-sm italic"
                        : "offscreen"
                  }
                  aria-live="assertive"
               >
                  {errMsg}
               </p>
               <div className="text-center mb-4">
                  <button
                     className="inline-block px-6 py-2.5 text-white bg-violet-500 font-medium leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                     type="submit"
                  >
                     Log in
                  </button>
               </div>
               <a className="text-gray-500 mb-4" href="#!">
                  Forgot password ?
               </a>
               <div className="flex items-center justify-between">
                  <p className="mr-2">Don't have an account?</p>
                  <button
                     type="button"
                     className="inline-block px-6 py-2 border-2 border-violet-500 text-violet-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                     Signup
                  </button>
               </div>
            </form>
         </section>
      );
   }

   return content;
};
export default Login;
