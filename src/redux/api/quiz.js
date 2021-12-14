import { setQuiz } from "../reducers/quiz";
import { setQuizRecord } from "../reducers/quizRecord";
import { loadRecords, setQuizRecords } from "../reducers/quizRecords";
import {
  loadQuizzes,
  removeQuiz,
  setNewQuiz,
  setQuizzes,
  updateQuiz,
} from "../reducers/quizzes";
import { requestAnswered, requestSent } from "../reducers/request";
import { API_Call } from "./middleware";

export const getQuizzes = ({ topic, partialName }) =>
  API_Call({
    url: "quiz/withParams",
    method: "get",
    params: { topic: topic?._id, partialName },
    beforeAll: loadQuizzes,
    onSuccess: setQuizzes,
  });

export const deleteQuiz = (_id) =>
  API_Call({
    url: "quiz",
    method: "delete",
    data: { _id },
    beforeAll: requestSent,
    onSuccess: removeQuiz,
    afterAll: requestAnswered,
  });

export const createUpdateQuiz = (oldQ, newQ, update, callback) =>
  API_Call({
    url: "quiz",
    method: oldQ && !update ? "put" : "post",
    data: newQ,
    beforeAll: requestSent,
    onSuccess: oldQ && !update ? updateQuiz : setNewQuiz,
    afterAll: requestAnswered,
    callback,
  });

export const tryGettingQuiz = (id) =>
  API_Call({
    url: "quiz",
    method: "get",
    params: { id },
    beforeAll: requestSent,
    onSuccess: setQuiz,
    afterAll: requestAnswered,
  });

export const submitQuiz = (data) =>
  API_Call({
    url: "quizRecord",
    method: "post",
    data,
    beforeAll: requestSent,
    onSuccess: setQuizRecord,
    afterAll: requestAnswered,
  });

export const getReportsWithParams = (id, dateRange) =>
  API_Call({
    url: "quizRecord",
    method: "get",
    params: { id, dateRange },
    beforeAll: loadRecords,
    onSuccess: setQuizRecords,
  });
