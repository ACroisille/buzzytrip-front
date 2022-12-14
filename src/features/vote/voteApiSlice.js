import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const voteAdapter = createEntityAdapter();
const initialState = voteAdapter.getInitialState();

/**
 * Vote related endpoints
 */
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
         query: ({ pollId, ...vote }) => ({
            url: "/vote/",
            method: "POST",
            body: vote,
         }),
         async onQueryStarted(
            { pollId, currentPage, currentSort, ...vote },
            { dispatch, queryFulfilled }
         ) {
            const patchResult = dispatch(
               apiSlice.util.updateQueryData(
                  "getPollChoices",
                  { pollId: pollId, page: currentPage, sort: currentSort },
                  (draft) => {
                     const choice = draft.entities[vote.choice];
                     if (choice) choice.votes.push(vote);
                  }
               )
            );
            try {
               await queryFulfilled;
            } catch {
               patchResult.undo();
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: "Choice", id: arg.choice },
            { type: "Voters", id: arg.choice },
            { type: "Participant", id: "VOTE_COUNT" },
         ],
      }),
      deleteVote: builder.mutation({
         query: ({ id }) => ({
            url: `/vote/${id}`,
            method: "DELETE",
            body: { id },
         }),
         async onQueryStarted(
            { pollId, currentPage, currentSort, ...vote },
            { dispatch, queryFulfilled }
         ) {
            const patchResult = dispatch(
               apiSlice.util.updateQueryData(
                  "getPollChoices",
                  { pollId: pollId, page: currentPage, sort: currentSort },
                  (draft) => {
                     const choice = draft.entities[vote.choice];
                     if (choice) {
                        choice.votes.splice(
                           choice.votes.findIndex((obj) => obj.id === vote.id),
                           1
                        );
                     }
                  }
               )
            );
            try {
               await queryFulfilled;
            } catch {
               patchResult.undo();
            }
         },
         invalidatesTags: (result, error, arg) => [
            { type: "Participant", id: "VOTE_COUNT" },
            { type: "Voters", id: arg.choice },
         ],
      }),
   }),
});

export const {
   useGetChoiceVotesQuery,
   useAddVoteMutation,
   useDeleteVoteMutation,
} = voteApiSlice;
