import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
   baseUrl: "http://localhost:8000/api/",
   credentials: "include",
   prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("access");
      if (token) {
         headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result?.error?.status === 401) {
      console.log("sending refresh token");
      // send refresh token to get new access token
      const refreshToken = localStorage.getItem("refresh");
      const refreshResult = await baseQuery(
         {
            url: "token/refresh/",
            method: "POST",
            body: { refresh: refreshToken },
         },
         api,
         extraOptions
      );
      console.log(refreshResult);
      if (refreshResult?.data) {
         // store the new token
         api.dispatch(setCredentials({ ...refreshResult.data }));
         // retry the original query with new access token
         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logOut());
      }
   }

   return result;
};

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
});
