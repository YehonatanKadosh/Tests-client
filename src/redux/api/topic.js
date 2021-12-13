import { requestAnswered, requestSent } from "../reducers/request";
import {
  loadTopics,
  newTopic,
  removeTopic,
  setTopics,
} from "../reducers/topic";
import { API_Call } from "./middleware";

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
