import { API_Call } from "../../../redux/middlewares/api";
import { requestAnswered, requestSent } from "../../../redux/reducers/request";
import { newTag } from "../../../redux/reducers/tag";
import { newTopic } from "../../../redux/reducers/topic";

export const AddTopicApiCall = (name, callback) =>
  API_Call({
    url: "topic",
    method: "post",
    data: { name },
    beforeAll: requestSent,
    onSuccess: newTopic,
    afterAll: requestAnswered,
    callback,
  });

export const AddTagApiCall = (name, topics, callback) =>
  API_Call({
    url: "tag",
    method: "post",
    data: { name, topics },
    beforeAll: requestSent,
    onSuccess: newTag,
    afterAll: requestAnswered,
    callback,
  });
