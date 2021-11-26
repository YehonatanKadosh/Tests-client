import * as Yup from "yup";

import { orientationTypes, questionTypes } from "../../../enums";
import answer_validator from "./Answer.schema";

const question_validator = Yup.object().shape({
  type: Yup.string().oneOf(Object.values(questionTypes)).required(),
  question: Yup.string().required(),
  context: Yup.string(),
  answers: Yup.array().of(answer_validator).required().min(2),
  orientation: Yup.string().oneOf(Object.values(orientationTypes)).required(),
  tags: Yup.array().of(Yup.object()).required().min(1, "at least 1 tag"),
  topics: Yup.array().of(Yup.object()).required().min(1, "at least 1 topic"),
  lastUpdated: Yup.date().required(),
  version: Yup.number().default(1),
});

export default question_validator;
