import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const participantAdpater = createEntityAdapter();
const initialState = participantAdpater.getInitialState();

/**
 * Participant related endpoints
 */
export const participantApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getParticipant: builder.query({
         query: ({ userId, pollId }) =>
            `/participant/?user_id=${userId}&poll_id=${pollId}`,
         transformResponse: (response) => {
            return participantAdpater.setOne(
               initialState,
               response[0] ? response[0] : { id: null }
            );
         },
         providesTags: (result) => [
            { type: "Participant", id: "CURRENT" },
            ...result.ids.map((id) => ({ type: "Participant", id })),
         ],
      }),
      getPollParticipants: builder.query({
         query: ({ pollId }) => `/participant/?poll_id=${pollId}`,
         transformResponse: (response) => {
            return participantAdpater.setAll(initialState, response);
         },
         providesTags: (result) => [
            { type: "Participant", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Participant", id })),
         ],
      }),
      getVoteCount: builder.query({
         query: ({ participantId }) =>
            `/participant/${participantId}/get_vote_count/`,
         providesTags: (result) => [{ type: "Participant", id: "VOTE_COUNT" }],
      }),
      getVoters: builder.query({
         query: ({ choiceId }) => `/choice/${choiceId}/get_voters/`,
         transformResponse: (response) => {
            return participantAdpater.setAll(initialState, response);
         },
         providesTags: (result, error, arg) => [
            { type: "Voters", id: arg.choiceId },
         ],
      }),
      addParticipant: builder.mutation({
         query: (participant) => ({
            url: "/participant/",
            method: "POST",
            body: participant,
         }),
         invalidatesTags: [
            { type: "Poll", id: "LIST" },
            { type: "Participant", id: "CURRENT" },
            { type: "Participant", id: "LIST" },
         ],
      }),
      updateParticipant: builder.mutation({
         query: ({ id, ...participant }) => ({
            url: `/participant/${id}/`,
            method: "PATCH",
            body: participant,
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Participant", id: arg.id },
         ],
      }),
      deleteParticipant: builder.mutation({
         query: ({ id }) => ({
            url: `/participant/${id}/`,
            method: "DELETE",
            body: { id },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: "Poll", id: "LIST" },
            { type: "Participant", id: arg.id },
         ],
      }),
   }),
});

export const {
   useGetParticipantQuery,
   useGetPollParticipantsQuery,
   useGetVoteCountQuery,
   useGetVotersQuery,
   useAddParticipantMutation,
   useUpdateParticipantMutation,
   useDeleteParticipantMutation,
} = participantApiSlice;
