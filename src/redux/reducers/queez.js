import { createSlice } from "@reduxjs/toolkit";
import { questionTypes } from "queezy-common";

const slice = createSlice({
  name: "queez",
  initialState: {},
  reducers: {
    setQueez: (state, action) => {
      if (action.payload) Object.assign(state, action.payload);
      else state = {};
    },
    changeAnswer: (state, action) => {
      const { questionId, answerId, type } = action.payload;
      const Q = state.questions.find((q) => q._id === questionId);
      if (type === questionTypes.SingleChoice)
        for (let i = 0; i < Q.answers.length; i++) {
          const answer = Q.answers[i];
          answer.isRight = answer._id === answerId;
        }
      else {
        const A = Q.answers.find((a) => a._id === answerId);
        A.isRight = !A.isRight;
      }
    },
  },
});
export const { setQueez, changeAnswer } = slice.actions;

export default slice.reducer;
export const get_queez = (state) => state.queez;
export const get_queez_introduction = (state) => state.queez.introduction;
export const get_answered_questions_amount = (state) => {
  const questions = state.queez.questions;
  let counter = 0;
  if (questions)
    for (let i = 0, answered = false; i < questions.length; i++) {
      const answers = questions[i].answers;
      for (let j = 0; j < answers.length; j++)
        answered = answered || answers[j].isRight;
      if (answered) counter++;
      answered = false;
    }
  return counter;
};
