import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "header",
  initialState: { name: "" },
  reducers: {
    setHeader: (state, action) => {
      state.name = action.payload;
    },
    removeHeader: (state, action) => {
      state.name = "";
    },
  },
});
export const { setHeader, removeHeader } = slice.actions;

export default slice.reducer;
export const get_header = (state) => state.header.name;
