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
    setQuizByRecord: (state, action) => {
      const { answers: answeredQuestions, quiz } = action.payload;
      const { questions: quizzesQuestions } = quiz;

      const questions = [];
      for (let i = 0; i < quizzesQuestions.length; i++) {
        const savedQuestion = quizzesQuestions[i];
        const answeredQuestion = answeredQuestions.find(
          (q) => q.question === savedQuestion._id.toString()
        );

        const answers = [];
        for (let j = 0; j < savedQuestion.answers.length; j++) {
          const savedAnswer = savedQuestion.answers[j];
          const answeredAnswer = answeredQuestion.answers.find(
            (a) => a === savedAnswer._id.toString()
          );
          answers.push({
            ...savedAnswer,
            isRight: answeredAnswer ? true : false,
          });
        }
        questions.push({ ...savedQuestion, answers });
      }
      Object.assign(state, { ...action.payload.quiz, questions });
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
    wipeQuiz: (state, action) => {
      state = {};
    },
  },
});
export const { setQuiz, setQuizByRecord, changeAnswer, wipeQuiz } =
  slice.actions;

export default slice.reducer;
export const get_quiz = (state) => state.quiz;
export const get_quiz_introduction = (state) => state.quiz.introduction;
export const get_answered_questions_amount = (state) => {
  const questions = state.quiz.questions;
  let counter = 0;
  if (questions.length)
    for (let i = 0, answered = false; i < questions.length; i++) {
      const answers = questions[i].answers;
      for (let j = 0; j < answers.length; j++)
        answered = answered || answers[j].isRight;
      if (answered) counter++;
      answered = false;
    }
  return counter;
};
