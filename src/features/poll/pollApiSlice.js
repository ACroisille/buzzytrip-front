import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const pollAdapter = createEntityAdapter();
const initialState = pollAdapter.getInitialState();

export const pollApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUserPolls: builder.query({
         query: ({ user_id }) => `/poll/?user_id=${user_id}`,
         transformResponse: (responseData) => {
            return pollAdapter.setAll(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Poll", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Poll", id })),
         ],
      }),
   }),
});

export const { useGetUserPollsQuery } = pollApiSlice;
