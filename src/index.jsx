import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Poll from "./pages/Poll";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Poll />} />
            </Routes>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
