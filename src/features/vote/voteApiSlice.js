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
            { type: "Vote", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Vote", id })),
         ],
      }),
   }),
});

export const { useGetChoiceVotesQuery } = voteApiSlice;
