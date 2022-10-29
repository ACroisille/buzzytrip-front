import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const participantAdpater = createEntityAdapter();
const initialState = participantAdpater.getInitialState();

export const participantApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getLoggedParticipant: builder.query({
         query: ({ userId, pollId }) =>
            `/participant/?user_id=${userId}&poll_id=${pollId}`,
         transformResponse: (responseData) => {
            return participantAdpater.setOne(initialState, responseData[0]);
         },
         providesTags: (result, error, arg) => [
            { type: "Participant", id: "LOGGED" },
         ],
      }),
      getPollParticipants: builder.query({
         query: ({ pollId }) => `/participant/?poll_id=${pollId}`,
         transformResponse: (responseData) => {
            return participantAdpater.setAll(initialState, responseData);
         },
         providesTags: (result, error, arg) => [
            { type: "Participant", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Participant", id })),
         ],
      }),
   }),
});

export const { useGetLoggedParticipantQuery, useGetPollParticipantsQuery } =
   participantApiSlice;
