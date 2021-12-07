import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "request",
  initialState: {
    loading: false,
  },
  reducers: {
    requestSent: (state) => {
      state.loading = true;
    },
    requestAnswered: (state) => {
      state.loading = false;
    },
  },
});
export const { requestSent, requestAnswered } = slice.actions;

export default slice.reducer;
export const get_request_loading = (state) => state.request.loading;
