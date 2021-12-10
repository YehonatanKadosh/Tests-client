import { createSlice } from "@reduxjs/toolkit";
import { questionTypes } from "quizy-yk-common";

const slice = createSlice({
  name: "quiz",
  initialState: {},
  reducers: {
    setQuiz: (state, action) => {
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
export const { setQuiz, changeAnswer } = slice.actions;

export default slice.reducer;
export const get_quiz = (state) => state.quiz;
export const get_quiz_introduction = (state) => state.quiz.introduction;
export const get_answered_questions_amount = (state) => {
  const questions = state.quiz.questions;
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
