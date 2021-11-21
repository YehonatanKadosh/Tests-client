import React, { useState } from "react";
import QuestionsTable from "./Questions.table";
import "./Questions.css";
import { useSelector } from "react-redux";
import { get_questions } from "../../redux/reducers/questions";
import { TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

function QuestionSearch() {
  const questions = useSelector(get_questions);
  const [tag, setTag] = useState("");
  const [topic, setTopic] = useState("");

  return (
    <>
      <div className="container-fluid questions_container p-3">
        <div className="row">
          <TextField
            className="col"
            label="sort by tag"
            onChange={(e) => setTag(e.target.value)}
          />
          <TextField
            className="col"
            label="sort by topic"
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="row questions_list">
          <QuestionsTable items={questions} />
        </div>
        <div className="row">
          <Button>
            <Link to="Create">
              <Add />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default QuestionSearch;
