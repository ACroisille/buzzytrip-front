import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

/**
 * Authentification related store
 */
const authSlice = createSlice({
   name: "auth",
   initialState: { userId: null },
   reducers: {
      setUserId: (state, action) => {
         const { userId } = action.payload;
         state.userId = userId;
      },
      setCredentials: (state, action) => {
         const { access, refresh } = action.payload;
         state.userId = access ? jwt_decode(access).user_id : undefined;

         sessionStorage.setItem("access", access);
         if (refresh) {
            localStorage.setItem("refresh", refresh);
         }
      },
      logOut: (state) => {
         state.userId = null;
         sessionStorage.setItem("access", null);
         localStorage.setItem("refresh", null);
         console.log("Logout");
      },
   },
});

export const { setUserId, setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.userId;

export default authSlice.reducer;
