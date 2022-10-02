import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "user",
   initialState: {
      status: "void",
      data: null,
      error: null,
   },
   reducers: {},
});
