import { Add, Delete } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Paper,
  IconButton,
  InputBase,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { questionTypes } from "../../enums";
import {
  AppFormChoiceList,
  AppFormField,
  AppFormFieldArray,
  AccordionBase,
} from "../AppUiElements/forms";
import TopicSelector from "../AppUiElements/selectors/TopicSelector";
import question_validator from "./Question.schema";
// import TagSelector from "../AppUiElements/selectors/TagSelector";
import "./Questions.css";

function CreateQuestion() {
  const [answers, setAnswers] = useState([]);
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
                extraErrordisabled
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
                extraErrordisabled
              />
            }
          />

          <Accordion
            expanded={expanded === "answers"}
            onChange={handleChange("answers")}
          >
            <AccordionSummary
              aria-controls="answers-content"
              id="answers-header"
            >
              <Typography>Answers: {answers.length}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {answers.map((answer, index) => (
                <Paper
                  variant="outlined"
                  key={index}
                  sx={{ display: "flex", width: "100%", m: 1 }}
                >
                  <IconButton>{index + 1}</IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={`Answer no. ${index + 1}`}
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={(e) => {
                      answers[index] = e.target.value;
                      setAnswers(answers);
                    }}
                    value={answer}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={(e) => {
                      answers.splice(index, 1);
                      setAnswers(answers);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Paper>
              ))}
              <Button
                onClick={() => setAnswers([...answers, ""])}
                sx={{ width: "100%" }}
              >
                <Add />
              </Button>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Formik>
  );
}

export default CreateQuestion;
