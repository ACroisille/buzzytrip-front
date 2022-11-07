import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const pollAdapter = createEntityAdapter();
const initialState = pollAdapter.getInitialState();

export const pollApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPoll: builder.query({
         query: ({ pollId }) => `/poll/${pollId}`,
         transformResponse: (responseData) => {
            return pollAdapter.setOne(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Poll", id: arg.pollId },
         ],
      }),
      getUserPolls: builder.query({
         query: ({ userId }) => `/poll/?user_id=${userId}`,
         transformResponse: (responseData) => {
            return pollAdapter.setAll(initialState, responseData);
         },
         providesTags: (result) => [
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
      updatePoll: builder.mutation({
         query: ({ id, ...poll }) => ({
            url: `/poll/${id}/`,
            method: "PATCH",
            body: poll,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Poll", id: arg.id },
         ],
      }),
      deletePoll: builder.mutation({
         query: ({ id }) => ({
            url: `/poll/${id}/`,
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
   useGetPollQuery,
   useGetUserPollsQuery,
   useAddPollMutation,
   useUpdatePollMutation,
   useDeletePollMutation,
} = pollApiSlice;
