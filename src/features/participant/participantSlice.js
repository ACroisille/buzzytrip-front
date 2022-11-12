import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
   name: "participant",
   initialState: {
      participantId: null,
      participantVotesCount: null,
   },
   reducers: {
      setParticipantId: (state, action) => {
         const { participantId } = action.payload;
         state.participantId = participantId;
      },
      setParticipantVotesCount: (state, action) => {
         const { voteCount } = action.payload;
         state.participantVotesCount = voteCount;
      },
   },
});

export const { setParticipantId, setParticipantVotesCount } =
   participantSlice.actions;

export const selectParticipantId = (state) => state.participant.participantId;
export const selectParticipantVotesCount = (state) =>
   state.participant.participantVotesCount;

export default participantSlice.reducer;
