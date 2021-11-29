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
    loadQuestions: (state, action) => {
      state.status = true;
    },
  },
});
export const { setNewQuestion, setQuestions, loadQuestions } = slice.actions;

export default slice.reducer;
export const get_questions = (state) => state.questions.items;
export const get_questions_status = (state) => state.questions.status;
export const get_question_by_id = (id) => (state) =>
  state.questions.items.filter((q) => q._id === id);
