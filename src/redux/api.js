import { API_Call } from "./middlewares/api";
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
import { loadTopics, newTopic, setTopics } from "./reducers/topic";
import { setUser } from "./reducers/user";

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

export const getTags = (params) =>
  API_Call({
    url: "tag",
    method: "get",
    params,
    beforeAll: loadTags,
    onSuccess: setTags,
  });

export const getQuestionsByTopic = (topic) =>
  API_Call({
    url: "question",
    method: "get",
    params: { topic: topic._id },
    beforeAll: loadQuestions,
    onSuccess: setQuestions,
  });

export const getQuestionsByTopicAndTag = (topic, tag) =>
  API_Call({
    url: "question",
    method: "get",
    params: { topic: topic._id, tag: tag._id },
    beforeAll: loadQuestions,
    onSuccess: setQuestions,
  });

export const deleteQuestion = (_id) => {
  API_Call({
    url: "question",
    method: "delete",
    data: { _id },
    beforeAll: requestSent,
    onSuccess: removeQuestion,
    afterAll: requestAnswered,
  });
};

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
