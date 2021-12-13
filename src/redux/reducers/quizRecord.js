import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quizRecord",
  initialState: {},
  reducers: {
    setQuizRecord: (state, action) => {
      if (action.payload) Object.assign(state, action.payload);
      else state = {};
    },
    wipeRecord: (state, action) => {
      state = {};
    },
  },
});
export const { setQuizRecord, wipeRecord } = slice.actions;

export default slice.reducer;
export const get_quizRecord = (state) => state.quizRecord;
