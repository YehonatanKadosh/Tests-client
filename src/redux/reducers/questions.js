import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {
    setNewQuestion: (state, action) => {
      state.push(action.payload);
    },
    setQuestions: (state, action) => {
      state = action.payload;
    },
  },
});
export const { setNewQuestion } = slice.actions;

export default slice.reducer;
export const get_questions = (state) => state.questions;
export const get_question_by_id = (id) => (state) =>
  state.questions.filter((q) => q._id === id);
