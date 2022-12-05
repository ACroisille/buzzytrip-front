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
      currentSort: "creation_time_desc",
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
      setCurrentSort: (state, action) => {
         const { currentSort } = action.payload;
         state.currentSort = currentSort;
      },
   },
});

export const {
   setParticipantId,
   setParticipantVotesCount,
   setCurrentPage,
   setCurrentSort,
} = participantSlice.actions;

export const selectParticipantId = (state) => state.participant.participantId;
export const selectParticipantVotesCount = (state) =>
   state.participant.participantVotesCount;
export const selectCurrentPage = (state) => state.participant.currentPage;
export const selectCurrentSort = (state) => state.participant.currentSort;

export default participantSlice.reducer;
