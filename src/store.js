import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import participantReducer from "./features/participant/participantSlice";

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      participant: participantReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});
