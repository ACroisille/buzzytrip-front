import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
   name: "participant",
   initialState: {
      status: "void",
      data: null,
      error: null,
   },
   reducers: {},
});
