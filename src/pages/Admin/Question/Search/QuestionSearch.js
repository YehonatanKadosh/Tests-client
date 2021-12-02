import { Link } from "react-router-dom";
import { Formik, useFormikContext } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import QuestionsTable from "./QuestionsTable";
import { AppSelector } from "../../../../UiElements";
import {
  addTag,
  addTopic,
  getQuestionsByTopic,
  getQuestionsByTopicAndTag,
  getTags,
} from "../../../../redux/api";
import "./QuestionSearch.css";
import { wipeAllQuestions } from "../../../../redux/reducers/questions";
import {
  get_tags_status,
  get_all_tags,
  wipeAllTags,
} from "../../../../redux/reducers/tag";
import {
  get_topics,
  get_topics_status,
} from "../../../../redux/reducers/topic";

import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

function QuestionSearch({ onAdd, Builder }) {
  const dispatch = useDispatch();
  const FormikBuilder = useFormikContext();

  const SearchContent = ({ values, setFieldValue }) => (
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
              dispatch(getQuestionsByTopic(topic));
            }}
            onEmpty={() => {
              dispatch(wipeAllTags());
              dispatch(wipeAllQuestions());
              if (Builder) {
                setFieldValue("questions", []);
                setFieldValue("topic", "");
              }
            }}
          />
        </div>
        {values.topic && (
          <div className="col">
            <AppSelector
              name="tag"
              valuesSelector={get_all_tags}
              valuesStatusSelector={get_tags_status}
              apiCall={(tag) =>
                addTag(tag, values.topic, (Ntag) => setFieldValue("tag", Ntag))
              }
              onChange={(tag) =>
                dispatch(getQuestionsByTopicAndTag(values.topic, tag))
              }
              onEmpty={() => {
                dispatch(getQuestionsByTopic(values.topic));
                if (Builder) {
                  setFieldValue("questions", []);
                  setFieldValue("tag", "");
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="row questions_list">
        <QuestionsTable Builder={Builder} />
      </div>
      <div className="row">
        {!onAdd ? (
          <Link to="Create">
            <Button sx={{ width: "100%" }}>
              <Add />
            </Button>
          </Link>
        ) : (
          <Button onClick={onAdd} sx={{ width: "100%" }}>
            <Add />
          </Button>
        )}
      </div>
    </div>
  );

  return Builder ? (
    SearchContent(FormikBuilder)
  ) : (
    <Formik initialValues={{ topic: "", tag: "" }}>{SearchContent}</Formik>
  );
}

export default QuestionSearch;
