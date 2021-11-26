import * as Yup from "yup";

const answer_validator = Yup.object().shape({
  content: Yup.string().required("answer content is missing"),
  isRight: Yup.boolean().required(),
});

export default answer_validator;
