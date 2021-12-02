import { Link } from "react-router-dom";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import QuestionsTable from "./QuestionsTable";

import { AppSelector } from "../../../../UiElements";
import { addTag, addTopic, getQuestions, getTags } from "../../../../redux/api";

import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import "./QuestionSearch.css";
import { get_questions } from "../../../../redux/reducers/questions";
import { get_tags_status, get_tags } from "../../../../redux/reducers/tag";
import {
  get_topics,
  get_topics_status,
} from "../../../../redux/reducers/topic";
function QuestionSearch() {
  const questions = useSelector(get_questions);
  const dispatch = useDispatch();

  return (
    <Formik initialValues={{ topic: "", tag: "" }}>
      {({ values, setFieldValue }) => (
        <div className="container-fluid questions_container p-3">
          <div className="row">
            <div className="col">
              <AppSelector
                name="topic"
                valuesSelector={get_topics}
                valuesStatusSelector={get_topics_status}
                apiCall={(topic) =>
                  addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
                }
                onChange={(topic) => {
                  dispatch(getTags({ topics: [topic._id] }));
                  dispatch(getQuestions(topic));
                }}
              />
            </div>
            {values.topic && (
              <div className="col">
                <AppSelector
                  name="tag"
                  valuesSelector={get_tags([values.topic])}
                  valuesStatusSelector={get_tags_status}
                  apiCall={(tag) =>
                    addTag(tag, values.topic, (Ntag) =>
                      setFieldValue("tag", Ntag)
                    )
                  }
                />
              </div>
            )}
          </div>
          <div className="row questions_list">
            <QuestionsTable items={questions} />
          </div>
          <div className="row">
            <Link to="Create">
              <Button sx={{ width: "100%" }}>
                <Add />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default QuestionSearch;
