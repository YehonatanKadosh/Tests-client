import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { orientationTypes, questionTypes } from "queezy-common";
import {
  AppFormChoiceList,
  AppFormError,
  AppFormField,
  AppFormAnswerListBuilder,
  SubmitButton,
} from "../AppUiElements/forms";
// import TagSelector from "../AppUiElements/selectors/TagSelector";
import "./Questions.css";
import { get_topics, get_topics_status } from "../../redux/reducers/topic";
import AppSelector from "../AppUiElements/selectors/AppSelector";
import {
  AddTagApiCall,
  AddTopicApiCall,
} from "../AppUiElements/selectors/SelectorsAddHandlers";
import { get_tags, get_tags_status } from "../../redux/reducers/tag";
import { Button, Dialog, FormHelperText } from "@mui/material";
import { question_validator } from "queezy-common";
import { useDispatch } from "react-redux";
import { API_Call } from "../../redux/middlewares/api";
import { setNewQuestion } from "../../redux/reducers/questions";
import { requestAnswered, requestSent } from "../../redux/reducers/request";
import { useNavigate } from "react-router-dom";
import QuestionShow from "./Question.show";

function CreateQuestion({ version, update }) {
  const [open, setOpen] = useState(false);
  const [contextVisable, setContextVisable] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitQuestion = (question) => {
    let answered = false;
    question.answers.forEach(
      (answer) => (answered = answered || answer.isRight)
    );
    if (!answered) setError("At least one answer must be marked");
    else {
      setError("");
      question.lastUpdated = new Date();
      question.version =
        version && update ? version + 1 : version ? version : 1;
      dispatch(
        API_Call({
          url: "question",
          method: "post",
          data: question,
          beforeAll: requestSent,
          onSuccess: setNewQuestion,
          afterAll: requestAnswered,
          callback: () => navigate("/"),
        })
      );
    }
  };

  return (
    <Formik
      initialValues={{
        topics: [],
        type: Object.values(questionTypes)[0],
        question: "",
        context: "",
        answers: [],
        orientation: Object.values(orientationTypes)[0],
        lastUpdated: undefined,
        tags: [],
        version: undefined,
      }}
      onSubmit={submitQuestion}
      validationSchema={question_validator}
    >
      {({ values }) => (
        <div className="create_question_container">
          <div className="row topics_tags_container">
            <div className="col">
              <FieldArray
                name="topics"
                render={({ push }) => (
                  <AppSelector
                    name="topics"
                    valuesSelector={get_topics}
                    valuesStatusSelector={get_topics_status}
                    multiple
                    apiCall={(topic) =>
                      AddTopicApiCall(topic, (Ntopic) => push(Ntopic))
                    }
                  />
                )}
              />
              <AppFormError name="topics" />
            </div>
            <div className="col">
              <FieldArray
                name="tags"
                render={({ push }) => (
                  <AppSelector
                    name="tags"
                    valuesSelector={get_tags(values.topics)}
                    valuesStatusSelector={get_tags_status}
                    multiple
                    disabled={values.topics.length ? false : true}
                    disabledPlaceholder="Choose Topic First"
                    apiCall={(tag) =>
                      AddTagApiCall(tag, values.topics, (Ntag) => push(Ntag))
                    }
                  />
                )}
              />
              <AppFormError name="tags" />
            </div>
          </div>

          <div className="my-1">
            <AppFormField
              name="question"
              label="Question"
              className="w-100"
              rows={4}
              multiline
            />
            <AppFormError name="question" />
          </div>

          {contextVisable && (
            <div className="my-1">
              <AppFormField
                name="context"
                label="Content"
                className="w-100"
                rows={4}
                multiline
              />
            </div>
          )}

          <div className="my-1">
            <AppFormAnswerListBuilder
              title="Answers"
              name="answers"
              placeHolder="New answer"
            />
            {error && (
              <FormHelperText className="text-center" error={true}>
                {error}
              </FormHelperText>
            )}
          </div>

          <div className="row text-center align-items-center my-1">
            <div className="col">
              <AppFormChoiceList
                title="Choose Type"
                name="type"
                Enum={questionTypes}
                onChange={(newType) => {
                  if (newType === questionTypes.SingleChoice)
                    values.answers.forEach((answer) => {
                      answer.isRight = false;
                    });
                }}
              />
            </div>
            <div className="col">
              <Button
                onClick={() => setContextVisable(!contextVisable)}
                variant="contained"
                sx={{ height: "fit-content", alignSelf: "center" }}
              >
                {!contextVisable ? "Add Context" : "Remove Context"}
              </Button>
            </div>
            <div className="col">
              <AppFormChoiceList
                title="Choose Orientation"
                name="orientation"
                className="col"
                Enum={orientationTypes}
              />
            </div>
          </div>

          <div className="row px-3">
            <SubmitButton title="Save Question" />
          </div>
          <Button onClick={() => setOpen(true)}>Preview</Button>
          <Dialog onClose={() => setOpen(false)} open={open}>
            <QuestionShow forShow {...values} />
          </Dialog>
        </div>
      )}
    </Formik>
  );
}
export default CreateQuestion;
