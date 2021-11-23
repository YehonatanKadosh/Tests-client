import React, { useState } from "react";
import QuestionsTable from "./Questions.table";
import "./Questions.css";
import { useSelector } from "react-redux";
import { get_questions } from "../../redux/reducers/questions";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TopicSelector from "../AppUiElements/selectors/TopicSelector";
import TagSelector from "../AppUiElements/selectors/TagSelector";

function QuestionSearch() {
  const questions = useSelector(get_questions);
  const [tag, setTag] = useState("");
  const [topic, setTopic] = useState("");

  const filteredQuestion = () => {
    let predicate;
    if (tag[0] && topic[0])
      predicate = (Q) => Q.tags.includes(tag[0]) && Q.topic.includes(topic[0]);
    else if (tag[0]) predicate = (Q) => Q.tags.includes(tag[0]);
    else if (topic[0]) predicate = (Q) => Q.topic.includes(topic[0]);
    else return questions;
    return questions.filter(predicate);
  };

  return (
    <>
      <div className="container-fluid questions_container p-3">
        <div className="row">
          <TopicSelector onSelected={setTopic} />
          <TagSelector onSelected={setTag} topic={topic} />
        </div>
        <div className="row questions_list">
          <QuestionsTable items={filteredQuestion()} />
        </div>
        <div className="row">
          <Link to="Create">
            <Button sx={{ width: "100%" }}>
              <Add />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default QuestionSearch;
