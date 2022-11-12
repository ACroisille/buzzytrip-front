import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const voteAdapter = createEntityAdapter();
const initialState = voteAdapter.getInitialState();

export const voteApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getChoiceVotes: builder.query({
         query: ({ choiceId }) => `/vote/?choice_id=${choiceId}`,
         transformResponse: (responseData) => {
            return voteAdapter.setAll(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "VoteList", id: arg.choiceId },
            ...result.ids.map((id) => ({ type: "Vote", id })),
         ],
      }),
      addVote: builder.mutation({
         query: (vote) => ({
            url: "/vote/",
            method: "POST",
            body: vote,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Choice", id: arg.choice },
         ],
      }),
      deleteVote: builder.mutation({
         query: ({ id }) => ({
            url: `/vote/${id}`,
            method: "DELETE",
            body: { id },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Choice", id: arg.choiceId },
         ],
      }),
   }),
});

export const {
   useGetChoiceVotesQuery,
   useAddVoteMutation,
   useDeleteVoteMutation,
} = voteApiSlice;
