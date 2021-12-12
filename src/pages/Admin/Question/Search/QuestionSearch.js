import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppSelector, AppTable } from "../../../../UiElements";
import {
  addTag,
  addTopic,
  deleteQuestion,
  getQuestions,
  getTags,
} from "../../../../redux/api";
import "./QuestionSearch.css";
import {
  get_questions,
  get_questions_loading,
  wipeAllQuestions,
} from "../../../../redux/reducers/questions";
import {
  get_tags_loading,
  get_all_tags,
  wipeAllTags,
} from "../../../../redux/reducers/tag";
import {
  get_topics,
  get_topics_loading,
} from "../../../../redux/reducers/topic";

import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { QuestionCreatePage, QuestionShowPage } from "../../..";

function QuestionSearch({ onSelected, onAdd }) {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();
  const questions = useSelector(get_questions);
  const questionsLoading = useSelector(get_questions_loading);

  const filterQuestions = () =>
    values.questions
      ? questions.filter((q) => !values.questions.find((Q) => Q._id === q._id))
      : questions;

  const onTopicChange = (topic) => {
    dispatch(getTags({ topics: [topic._id] }));
    dispatch(getQuestions({ topic }));
    setFieldValue("tag", "");
  };
  const onTopicEmpty = () => {
    dispatch(wipeAllTags());
    dispatch(wipeAllQuestions());
    setFieldValue("tag", "");
    if (!onSelected) setFieldValue("questions", []);
  };

  return (
    <div className="container-fluid questions_container p-3">
      <div className="row">
        <div className="col">
          <TextField
            label="partial question"
            sx={{ width: "100%" }}
            variant="outlined"
            value={values.partialQuestion || ""}
            onChange={(e) => setFieldValue("partialQuestion", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && values.partialQuestion?.trim().length)
                dispatch(
                  getQuestions({
                    topic: values.topic,
                    tag: values.tag,
                    partialQuestion: values.partialQuestion.trim(),
                  })
                );
            }}
          />
        </div>
        <div className="col">
          <AppSelector
            name="topic"
            valuesSelector={get_topics}
            valuesStatusSelector={get_topics_loading}
            apiCall={(topic) =>
              addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
            }
            onChange={onTopicChange}
            onEmpty={onTopicEmpty}
          />
        </div>
        {values.topic && (
          <div className="col">
            <AppSelector
              name="tag"
              valuesSelector={get_all_tags}
              valuesStatusSelector={get_tags_loading}
              apiCall={(tag) =>
                addTag(tag, values.topic, (Ntag) => setFieldValue("tag", Ntag))
              }
              onChange={(tag) =>
                dispatch(getQuestions({ topic: values.topic, tag }))
              }
              onEmpty={() => {
                dispatch(getQuestions({ topic: values.topic }));
                if (!onSelected) setFieldValue("questions", []);
              }}
            />
          </div>
        )}
      </div>
      {questions.length ? (
        <div className="row questions_list justify-content-center">
          <AppTable
            collection={filterQuestions()}
            loading={questionsLoading}
            onSelected={onSelected}
            onShow={(Q) => <QuestionShowPage forShow {...Q} />}
            onEdit={(Q, onSave) => <QuestionCreatePage onSave={onSave} Q={Q} />}
            onUpdate={(Q, onSave) => (
              <QuestionCreatePage update onSave={onSave} Q={Q} />
            )}
            onDelete={(Q) => dispatch(deleteQuestion(Q._id))}
            headerCells={[
              "Question",
              "Topics",
              "Tags",
              "Last Update",
              "Version",
            ]}
            bodyCells={[
              "question",
              (q) => q.topics.map((t) => <div key={t._id}>{t.name}</div>),
              (q) => q.tags.map((t) => <div key={t._id}>{t.name}</div>),
              "lastUpdated",
              "version",
            ]}
          />
        </div>
      ) : (
        <div className="row questions_list"></div>
      )}
      <div className="row">
        {!onAdd ? (
          <Link to="Create">
            <Button variant="contained" sx={{ width: "100%" }}>
              <Add />
            </Button>
          </Link>
        ) : (
          <Button variant="contained" onClick={onAdd} sx={{ width: "100%" }}>
            <Add />
          </Button>
        )}
      </div>
    </div>
  );
}

export default QuestionSearch;
