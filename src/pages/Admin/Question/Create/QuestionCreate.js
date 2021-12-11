import {
  question_validator,
  orientationTypes,
  questionTypes,
} from "quizy-yk-common";
import { useDispatch } from "react-redux";
import { FieldArray, Formik } from "formik";
import React, { useState } from "react";

import {
  AppFormChoiceList,
  AppFormError,
  AppFormField,
  AppFormAnswerListBuilder,
  AppFormSubmitButton,
  AppSelector,
} from "../../../../UiElements";
import {
  addTag,
  addTopic,
  createUpdateQuestion,
  getTags,
} from "../../../../redux/api";

import { Button, Dialog, FormHelperText } from "@mui/material";

import "./QuestionCreate.css";
import { removeQuestion } from "../../../../redux/reducers/questions";
import {
  get_topics,
  get_topics_loading,
} from "../../../../redux/reducers/topic";
import { get_all_tags, get_tags_loading } from "../../../../redux/reducers/tag";
import { QuestionShowPage } from "../../..";
import { useNavigate } from "react-router";

function QuestionCreate({ update, Q, onSave }) {
  const [open, setOpen] = useState(false);
  const [contextVisable, setContextVisable] = useState(
    Q?.context ? true : false
  );
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
      dispatch(
        createUpdateQuestion(
          Q,
          {
            ...question,
            lastUpdated: new Date(),
            version: update ? Q?.version + 1 : Q?.version || 1,
          },
          update,
          onSave ? onSave : () => navigate("Questions")
        )
      );
      if (update) dispatch(removeQuestion({ _id: Q._id }));
    }
  };

  return (
    <Formik
      initialValues={
        Q || {
          topics: [],
          type: Object.values(questionTypes)[0],
          question: "",
          context: "",
          answers: [],
          orientation: Object.values(orientationTypes)[0],
          lastUpdated: undefined,
          tags: [],
          version: undefined,
        }
      }
      onSubmit={submitQuestion}
      validationSchema={question_validator}
    >
      {({ values, setFieldValue }) => (
        <div className="create_question_container">
          <div className="row topics_tags_container">
            <div className="col">
              <FieldArray
                name="topics"
                render={({ push }) => (
                  <AppSelector
                    name="topics"
                    valuesSelector={get_topics}
                    valuesStatusSelector={get_topics_loading}
                    multiple
                    apiCall={(topic) =>
                      addTopic(topic, (Ntopic) => push(Ntopic))
                    }
                    onChange={(topics) =>
                      dispatch(getTags({ topics: topics.map((t) => t._id) }))
                    }
                  />
                )}
              />
              <AppFormError name="topics" />
            </div>
            {values.topics.length ? (
              <div className="col">
                <FieldArray
                  name="tags"
                  render={({ push }) => (
                    <AppSelector
                      name="tags"
                      valuesSelector={get_all_tags}
                      valuesStatusSelector={get_tags_loading}
                      multiple
                      apiCall={(tag) =>
                        addTag(tag, values.topics, (Ntag) => push(Ntag))
                      }
                    />
                  )}
                />
                <AppFormError name="tags" />
              </div>
            ) : null}
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
                    setFieldValue(
                      "answers",
                      values.answers.map((answer) => {
                        return { ...answer, isRight: false };
                      })
                    );
                }}
              />
            </div>
            <div className="col">
              <Button
                onClick={() => {
                  if (contextVisable) setFieldValue("context", "");
                  setContextVisable(!contextVisable);
                }}
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
            <AppFormSubmitButton title="Save Question" />
          </div>
          <Button onClick={() => setOpen(true)}>Preview</Button>
          {open && (
            <Dialog onClose={() => setOpen(false)} open={open}>
              <QuestionShowPage forShow {...values} />
            </Dialog>
          )}
        </div>
      )}
    </Formik>
  );
}
export default QuestionCreate;
