import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quizs",
  initialState: { items: [], loading: false },
  reducers: {
    setNewquiz: (state, action) => {
      state.items.push(action.payload);
    },
    setQuizs: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    updatequiz: (state, action) => {
      let quiz = state.items.find((q) => q._id === action.payload._id);
      if (quiz) Object.assign(quiz, action.payload);
    },
    loadquizs: (state, action) => {
      state.loading = true;
    },
    removeQuiz: (state, action) => {
      const removedQ = state.items.find((q) => q._id === action.payload._id);
      if (removedQ) state.items.splice(state.items.indexOf(removedQ), 1);
    },
    wipeAllQuizs: (state, action) => {
      state.items = [];
    },
  },
});
export const {
  updatequiz,
  setNewquiz,
  setQuizs,
  loadquizs,
  removeQuiz,
  wipeAllQuizs,
} = slice.actions;

export default slice.reducer;
export const get_quizs = (state) => state.quizs.items;
export const get_quizs_loading = (state) => state.quizs.loading;
export const get_quiz_by_id = (id) => (state) =>
  state.quizs.items.filter((q) => q._id === id);
