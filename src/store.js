import { configureStore } from "@reduxjs/toolkit";
import choices from "./features/choices";

const store = configureStore({
   reducer: {
      choices: choices,
   },
});

export default store;
