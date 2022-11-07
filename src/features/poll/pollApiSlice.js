import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const pollAdapter = createEntityAdapter();
const initialState = pollAdapter.getInitialState();

export const pollApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUserPolls: builder.query({
         query: ({ userId }) => `/poll/?user_id=${userId}`,
         transformResponse: (responseData) => {
            return pollAdapter.setAll(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Poll", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Poll", id })),
         ],
      }),
      addPoll: builder.mutation({
         query: (poll) => ({
            url: "/poll/",
            method: "POST",
            body: poll,
         }),
         invalidatesTags: [{ type: "Poll", id: "LIST" }],
      }),
      deletePoll: builder.mutation({
         query: ({ id }) => ({
            url: `/poll/${id}`,
            method: "DELETE",
            body: { id },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Poll", id: arg.id },
         ],
      }),
   }),
});

export const {
   useGetUserPollsQuery,
   useAddPollMutation,
   useDeletePollMutation,
} = pollApiSlice;
