import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "questions",
  initialState: { items: [], status: false },
  reducers: {
    setNewQuestion: (state, action) => {
      state.items.push(action.payload);
    },
    setQuestions: (state, action) => {
      state.items = action.payload;
      state.status = false;
    },
    updateQuestion: (state, action) => {
      const Q = state.items.find((Q) => Q._id === action.payload._id);
      Object.assign(Q, action.payload);
    },
    loadQuestions: (state, action) => {
      state.status = true;
    },
    removeQuestion: (state, action) => {
      const removedQ = state.items.find((q) => q._id === action.payload._id);
      if (removedQ) state.items.splice(state.items.indexOf(removedQ), 1);
    },
    wipeAllQuestions: (state, action) => {
      state.items = [];
    },
  },
});
export const {
  updateQuestion,
  setNewQuestion,
  setQuestions,
  loadQuestions,
  removeQuestion,
  wipeAllQuestions,
} = slice.actions;

export default slice.reducer;
export const get_questions = (state) => state.questions.items;
export const get_questions_status = (state) => state.questions.status;
export const get_question_by_id = (id) => (state) =>
  state.questions.items.filter((q) => q._id === id);
