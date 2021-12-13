import {
  loadQuestions,
  removeQuestion,
  setNewQuestion,
  setQuestions,
  updateQuestion,
} from "../reducers/questions";
import { requestAnswered, requestSent } from "../reducers/request";
import { API_Call } from "./middleware";

export const getQuestions = ({ topic, tag, partialQuestion }) =>
  API_Call({
    url: "question",
    method: "get",
    params: { topic: topic?._id, tag: tag?._id, partialQuestion },
    beforeAll: loadQuestions,
    onSuccess: setQuestions,
  });

export const deleteQuestion = (_id) =>
  API_Call({
    url: "question",
    method: "delete",
    data: { _id },
    beforeAll: requestSent,
    onSuccess: removeQuestion,
    afterAll: requestAnswered,
  });

export const createUpdateQuestion = (oldQ, newQ, update, callback) =>
  API_Call({
    url: "question",
    method: oldQ && !update ? "put" : "post",
    data: newQ,
    beforeAll: requestSent,
    onSuccess: oldQ && !update ? updateQuestion : setNewQuestion,
    afterAll: requestAnswered,
    callback,
  });
