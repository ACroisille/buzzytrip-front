import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

/**
 *  User related endpoints
 */
export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ id }) => `/user/${id}`,
         transformResponse: (responseData) => {
            return userAdapter.setOne(initialState, responseData);
         },
         providesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
      }),
      updateUser: builder.mutation({
         query: ({ id, ...user }) => ({
            url: `/user/${id}/`,
            method: "PATCH",
            body: user,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "User", id: arg.id },
         ],
      }),
   }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
