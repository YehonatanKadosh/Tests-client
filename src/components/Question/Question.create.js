import { Formik } from "formik";
import React, { useState } from "react";
import { questionTypes } from "../../enums";
import {
  AppFormChoiceList,
  AppFormField,
  AppFormFieldArray,
  AccordionBase,
  AppFormListBuilder,
} from "../AppUiElements/forms";
import TopicSelector from "../AppUiElements/selectors/TopicSelector";
import question_validator from "./schemas/Question.schema";
// import TagSelector from "../AppUiElements/selectors/TagSelector";
import "./Questions.css";

function CreateQuestion() {
  const [expanded, setExpanded] = useState("topic");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitQuestion = (question) => {
    console.log(question);
  };

  return (
    <Formik
      initialValues={{
        topics: [],
        type: undefined,
        question: undefined,
        context: undefined,
        orientation: undefined,
        lastUpdated: undefined,
        answers: [],
        tags: [],
        version: undefined,
      }}
      onSubmit={submitQuestion}
      validationSchema={question_validator}
    >
      {({ values }) => (
        <>
          <AppFormFieldArray
            Selector={TopicSelector}
            expanded={expanded}
            title="Choose Topics"
            handleChange={handleChange}
            name="topics"
          />
          <AppFormChoiceList
            expanded={expanded}
            title="Choose Type"
            handleChange={handleChange}
            name="type"
            enum={questionTypes}
          />
          <AccordionBase
            expanded={expanded}
            title="Question"
            handleChange={handleChange}
            name="question"
            headerContent={`: ${values.question}`}
            detailsContent={
              <AppFormField
                name="question"
                label="Content"
                className="w-100"
                rows={4}
                multiline
              />
            }
          />
          <AccordionBase
            expanded={expanded}
            title="Context"
            handleChange={handleChange}
            name="context"
            headerContent={`: ${values.context}`}
            detailsContent={
              <AppFormField
                name="context"
                label="Content"
                className="w-100"
                rows={4}
                multiline
              />
            }
          />
          <AppFormListBuilder
            expanded={expanded}
            title="Answers"
            handleChange={handleChange}
            name="answers"
            placeHolder="New answer"
          />
        </>
      )}
    </Formik>
  );
}

export default CreateQuestion;
