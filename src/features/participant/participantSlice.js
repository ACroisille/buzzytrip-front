import { createSlice } from "@reduxjs/toolkit";

/**
 * Participant related store
 */
const participantSlice = createSlice({
   name: "participant",
   initialState: {
      participantId: null,
      participantVotesCount: null,
      currentPage: 1,
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
      setCurrentPage: (state, action) => {
         const { currentPage } = action.payload;
         state.currentPage = currentPage;
      },
   },
});

export const { setParticipantId, setParticipantVotesCount, setCurrentPage } =
   participantSlice.actions;

export const selectParticipantId = (state) => state.participant.participantId;
export const selectParticipantVotesCount = (state) =>
   state.participant.participantVotesCount;
export const selectCurrentPage = (state) => state.participant.currentPage;

export default participantSlice.reducer;
