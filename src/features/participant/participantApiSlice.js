import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const participantAdpater = createEntityAdapter();
const initialState = participantAdpater.getInitialState();

export const participantApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getParticipant: builder.query({
         query: ({ userId, pollId }) =>
            `/participant/?user_id=${userId}&poll_id=${pollId}`,
         transformResponse: (responseData) => {
            return participantAdpater.setOne(
               initialState,
               responseData[0] ? responseData[0] : { id: null }
            );
         },
         providesTags: (result) => [
            { type: "Participant", id: "CURRENT" },
            ...result.ids.map((id) => ({ type: "Participant", id })),
         ],
      }),
      getPollParticipants: builder.query({
         query: ({ pollId }) => `/participant/?poll_id=${pollId}`,
         transformResponse: (responseData) => {
            return participantAdpater.setAll(initialState, responseData);
         },
         providesTags: (result) => [
            { type: "Participant", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Participant", id })),
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
   useAddParticipantMutation,
   useUpdateParticipantMutation,
   useDeleteParticipantMutation,
} = participantApiSlice;
