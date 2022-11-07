import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Home from "./components/Home";
import Account from "./features/user/Account";
import Poll from "./features/poll/Poll";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Layout />}>
                  {/* public routes */}
                  <Route index element={<Public />} />
                  <Route path="login" element={<Login />} />
                  {/* protected routes */}
                  <Route element={<RequireAuth />}>
                     <Route path="home" element={<Home />} />
                     <Route path="account" element={<Account />} />
                     <Route path="poll/:poll_id" element={<Poll />} />
                  </Route>
               </Route>
            </Routes>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
