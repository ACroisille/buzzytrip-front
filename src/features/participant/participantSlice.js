import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
   name: "participant",
   initialState: {
      participantId: null,
      participantVotes: null,
      participantVotesCount: null,
   },
   reducers: {
      setParticipantId: (state, action) => {
         const { participantId } = action.payload;
         state.participantId = participantId;
      },
      setParticipantVotes: (state, action) => {
         state.participantVotes = {
            ...state.participantVotes,
            ...action.payload,
         };
         state.participantVotesCount = Object.values(
            state.participantVotes
         ).reduce((a, b) => a + b, 0);
      },
   },
});

export const { setParticipantId, setParticipantVotes } =
   participantSlice.actions;

export const selectParticipantId = (state) => state.participant.participantId;
export const selectParticipantVotesCount = (state) =>
   state.participant.participantVotesCount;

export default participantSlice.reducer;
