import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "request",
  initialState: {
    status: false,
  },
  reducers: {
    requestSent: (state) => {
      state.status = true;
    },
    requestAnswered: (state) => {
      state.status = false;
    },
  },
});
export const { requestSent, requestAnswered } = slice.actions;

export default slice.reducer;
export const get_request_status = (state) => state.request.status;
