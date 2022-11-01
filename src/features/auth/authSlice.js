import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: { username: null },
   reducers: {
      setCredentials: (state, action) => {
         const { username, access, refresh } = action.payload;
         state.username = username;

         sessionStorage.setItem("access", access);
         if (refresh) {
            localStorage.setItem("refresh", refresh);
         }
      },
      logOut: (state) => {
         state.username = null;
         sessionStorage.setItem("access", null);
         localStorage.setItem("refresh", null);
      },
   },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.username;

export default authSlice.reducer;
