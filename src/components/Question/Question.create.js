import { Add, Delete } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useState } from "react";
import { questionTypes } from "../../enums";
import TopicSelector from "../AppUiElements/selectors/TopicSelector";
// import TagSelector from "../AppUiElements/selectors/TagSelector";

function CreateQuestion() {
  const topic = useState("");
  const [type, setType] = useState("");
  const [topics, setTopics] = useState([]);
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [answers, setAnswers] = useState([]);
  const [expanded, setExpanded] = useState("topic");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleTopicAdd = (topicName) => {
    if (!topics.includes(topicName)) setTopics([...topics, topicName]);
    topic[1]("");
  };

  return (
    <>
      <Accordion
        expanded={expanded === "topic"}
        onChange={handleChange("topic")}
      >
        <AccordionSummary aria-controls="topic-content" id="topic-header">
          <Typography>
            Choose Topic:{" "}
            {topics.map((topic) => (
              <Button
                className="m-1"
                variant="contained"
                key={topic}
                endIcon={<Delete />}
                onClick={() =>
                  setTopics([...topics.filter((t) => t !== topic)])
                }
              >
                {topic}
              </Button>
            ))}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TopicSelector state={topic} onSelected={handleTopicAdd} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "type"} onChange={handleChange("type")}>
        <AccordionSummary aria-controls="type-content" id="type-header">
          <Typography>
            Choose Questions Type:{" "}
            {type && (
              <Button className="mx-1" variant="contained" key={type}>
                {type}
              </Button>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.values(questionTypes).map((T) => (
            <Button
              className="mx-1"
              variant="outlined"
              key={T}
              onClick={() => setType(T)}
            >
              {T}
            </Button>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "Question"}
        onChange={handleChange("Question")}
      >
        <AccordionSummary aria-controls="Question-content" id="Question-header">
          <Typography>Question: {question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="outlined-multiline-static"
            label="Question content"
            multiline
            className="w-100"
            rows={4}
            onChange={(e) => setQuestion(e.target.value)}
            defaultValue={question}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "context"}
        onChange={handleChange("context")}
      >
        <AccordionSummary aria-controls="context-content" id="context-header">
          <Typography>Context: {context}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="outlined-multiline-static"
            label="Question context"
            className="w-100"
            multiline
            rows={4}
            onChange={(e) => setContext(e.target.value)}
            defaultValue={question}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "answers"}
        onChange={handleChange("answers")}
      >
        <AccordionSummary aria-controls="answers-content" id="answers-header">
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
                  console.log(index, answers);
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
  );
}

export default CreateQuestion;
