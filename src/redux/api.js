import { API_Call } from "./middlewares/api";
import { setQuiz } from "./reducers/quiz";
import {
  loadquizs,
  removeQuiz,
  setNewquiz,
  setQuizs,
  updatequiz,
} from "./reducers/quizs";
import {
  loadQuestions,
  removeQuestion,
  setNewQuestion,
  setQuestions,
  updateQuestion,
} from "./reducers/questions";
import { requestAnswered, requestSent } from "./reducers/request";
import { setLogin, setLoginError, setSignupError } from "./reducers/signInUp";
import { loadTags, newTag, setTags } from "./reducers/tag";
import { loadTopics, newTopic, removeTopic, setTopics } from "./reducers/topic";
import { setUser } from "./reducers/user";
import { setQuizRecord } from "./reducers/quizRecord";

export const addTopic = (name, callback) =>
  API_Call({
    url: "topic",
    method: "post",
    data: { name },
    beforeAll: requestSent,
    onSuccess: newTopic,
    afterAll: requestAnswered,
    callback,
  });

export const addTag = (name, topics, callback) =>
  API_Call({
    url: "tag",
    method: "post",
    data: { name, topics },
    beforeAll: requestSent,
    onSuccess: newTag,
    afterAll: requestAnswered,
    callback,
  });

export const getTopics = API_Call({
  url: "topic",
  method: "get",
  beforeAll: loadTopics,
  onSuccess: setTopics,
});

export const deleteTopics = (_id) =>
  API_Call({
    url: "topic",
    method: "delete",
    data: { _id },
    beforeAll: requestSent,
    onSuccess: removeTopic,
    afterAll: requestAnswered,
  });

export const getTopicsWithStats = API_Call({
  url: "topic/withStats",
  method: "get",
  beforeAll: loadTopics,
  onSuccess: setTopics,
});

export const getTags = (params) =>
  API_Call({
    url: "tag",
    method: "get",
    params,
    beforeAll: loadTags,
    onSuccess: setTags,
  });

export const getQuizzes = ({ topic, partialName }) =>
  API_Call({
    url: "quiz/withParams",
    method: "get",
    params: { topic: topic?._id, partialName },
    beforeAll: loadquizs,
    onSuccess: setQuizs,
  });

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

export const deleteQuiz = (_id) =>
  API_Call({
    url: "quiz",
    method: "delete",
    data: { _id },
    beforeAll: requestSent,
    onSuccess: removeQuiz,
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

export const createUpdateQuiz = (oldQ, newQ, update, callback) =>
  API_Call({
    url: "quiz",
    method: oldQ && !update ? "put" : "post",
    data: newQ,
    beforeAll: requestSent,
    onSuccess: oldQ && !update ? updatequiz : setNewquiz,
    afterAll: requestAnswered,
    callback,
  });

export const login = ({ email, password, rememberMe }) =>
  API_Call({
    url: "login",
    method: "post",
    data: { email, password },
    beforeAll: setLogin,
    onSuccess: setUser,
    onError: setLoginError,
    saveToken: rememberMe,
  });

export const signUp = (data) =>
  API_Call({
    url: "signup",
    method: "post",
    data,
    beforeAll: setLogin,
    onSuccess: setUser,
    onError: setSignupError,
  });

export const tryLogin = API_Call({
  url: "login",
  method: "get",
  beforeAll: setLogin,
  onSuccess: setUser,
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
