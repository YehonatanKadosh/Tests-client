import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "quizzes",
  initialState: { items: [], loading: false },
  reducers: {
    setNewQuiz: (state, action) => {
      state.items.push(action.payload);
    },
    setQuizzes: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    updateQuiz: (state, action) => {
      let quiz = state.items.find((q) => q._id === action.payload._id);
      if (quiz) Object.assign(quiz, action.payload);
    },
    loadQuizzes: (state, action) => {
      state.loading = true;
    },
    removeQuiz: (state, action) => {
      const removedQ = state.items.find((q) => q._id === action.payload._id);
      if (removedQ) state.items.splice(state.items.indexOf(removedQ), 1);
    },
    wipeAllQuizzes: (state, action) => {
      state.items = [];
    },
  },
});
export const {
  updateQuiz,
  setNewQuiz,
  setQuizzes,
  loadQuizzes,
  removeQuiz,
  wipeAllQuizzes,
} = slice.actions;

export default slice.reducer;
export const get_quizzes = (state) => state.quizzes.items;
export const get_quizzes_loading = (state) => state.quizzes.loading;
export const get_quiz_by_id = (id) => (state) =>
  state.quizzes.items.filter((q) => q._id === id);
