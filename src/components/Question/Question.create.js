import { FieldArray, Formik } from "formik";
import React, { createContext, useState } from "react";
import { orientationTypes, questionTypes } from "../../enums";
import {
  AppFormChoiceList,
  AppFormError,
  AppFormField,
  AppFormListBuilder,
  SubmitButton,
} from "../AppUiElements/forms";
import question_validator from "./schemas/Question.schema";
// import TagSelector from "../AppUiElements/selectors/TagSelector";
import "./Questions.css";
import { get_topics } from "../../redux/reducers/topic";
import { get_request_status } from "../../redux/reducers/request";
import AppMultipleSelector from "../AppUiElements/selectors/AppMultipleSelector";
import {
  AddTagApiCall,
  AddTopicApiCall,
} from "../AppUiElements/selectors/SelectorsAddHandlers";
import { get_tags, get_tags_status } from "../../redux/reducers/tag";
import { Button } from "@mui/material";

export const AccordionContext = createContext();

function CreateQuestion() {
  const [expanded, setExpanded] = useState("topic");
  const [contextVisable, setContextVisable] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitQuestion = (question) => {
    console.log(question);
  };

  return (
    <AccordionContext.Provider value={{ expanded, handleChange }}>
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
                    <AppMultipleSelector
                      name="topics"
                      valuesSelector={get_topics}
                      valuesStatusSelector={get_request_status}
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
                    <AppMultipleSelector
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
              <AppFormListBuilder
                title="Answers"
                name="answers"
                placeHolder="New answer"
              />
            </div>

            <div className="row text-center align-items-center my-1">
              <div className="col">
                <AppFormChoiceList
                  title="Choose Type"
                  name="type"
                  Enum={questionTypes}
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
          </div>
        )}
      </Formik>
    </AccordionContext.Provider>
  );
}

export default CreateQuestion;
