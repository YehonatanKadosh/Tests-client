import { requestAnswered, requestSent } from "../reducers/request";
import { loadTags, newTag, setTags } from "../reducers/tag";
import { API_Call } from "./middleware";

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

export const getTags = (params) =>
  API_Call({
    url: "tag",
    method: "get",
    params,
    beforeAll: loadTags,
    onSuccess: setTags,
  });
