import { createSlice } from "@reduxjs/toolkit";

const pollSlice = createSlice({
   name: "poll",
   initialState: {
      status: "void",
      data: null,
      error: null,
   },
   reducers: {},
});
