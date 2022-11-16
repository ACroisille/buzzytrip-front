import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";

/**
 * This is the base Query for all API Query.
 * It includes the access token in the header.
 */
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

/**
 * If baseQuery response is 401 (Unauthorized),
 * use the refresh token to generate an access token
 * then run the query again with the new access token.
 * @param args
 * @param api
 * @param extraOptions
 * @returns {Promise<*>}
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result?.error?.status === 401) {
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
