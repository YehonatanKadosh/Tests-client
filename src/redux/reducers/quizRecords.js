import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quizRecords",
  initialState: { items: [], loading: false },
  reducers: {
    setQuizRecords: (state, action) => {
      state.loading = false;
      if (action.payload) Object.assign(state.items, action.payload);
      else state = {};
    },
    wipeRecords: (state, action) => {
      state.items = [];
    },
    loadRecords: (state, action) => {
      state.loading = true;
    },
  },
});
export const { setQuizRecords, wipeRecords, loadRecords } = slice.actions;

export default slice.reducer;
export const get_quizRecords = (state) => state.quizRecords.items;
export const get_quizRecords_loading = (state) => state.quizRecords.loading;
