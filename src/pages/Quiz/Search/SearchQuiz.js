import { Add, ContentCopy } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CreateQuizPage } from "../..";
import { addTopic, deleteQuiz, getQuizByTopic } from "../../../redux/api";
import { setQuiz } from "../../../redux/reducers/quiz";
import {
  get_quizs,
  get_quizs_loading,
  wipeAllQuizs,
} from "../../../redux/reducers/quizs";
import { get_topics, get_topics_loading } from "../../../redux/reducers/topic";
import { AppSelector, AppTable } from "../../../UiElements";
import ShowQuiz from "../Show/ShowQuiz";
import { CopyToClipboard } from "react-copy-to-clipboard";

function SearchQuiz() {
  const dispatch = useDispatch();
  const quizes = useSelector(get_quizs);
  const loading = useSelector(get_quizs_loading);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  return (
    <Formik initialValues={{ topic: "" }}>
      {({ setFieldValue, values }) => (
        <div className="container-fluid questions_container p-3">
          <div className="row">
            <AppSelector
              name="topic"
              valuesSelector={get_topics}
              valuesStatusSelector={get_topics_loading}
              apiCall={(topic) =>
                addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
              }
              onChange={(topic) => dispatch(getQuizByTopic(topic))}
              onEmpty={() => dispatch(wipeAllQuizs())}
            />
          </div>

          {quizes.length ? (
            <>
              <div className="row questions_list">
                <AppTable
                  collection={quizes}
                  loading={loading}
                  onShow={(Q) => {
                    dispatch(setQuiz(Q));
                    return <ShowQuiz forShow />;
                  }}
                  onEdit={(Q, onSave) => (
                    <CreateQuizPage onSave={onSave} Q={Q} />
                  )}
                  onUpdate={(Q, onSave) => (
                    <CreateQuizPage onSave={onSave} update Q={Q} />
                  )}
                  onDelete={(Q) => dispatch(deleteQuiz(Q._id))}
                  headerCells={["Name", "Topic", "Language", "Link"]}
                  bodyCells={[
                    "name",
                    (q) => q.topic.name,
                    "language",
                    (q) => (
                      <CopyToClipboard
                        onCopy={() =>
                          setSnackBarOpen(`'${q.name}' link copied`)
                        }
                        text={`${process.env.REACT_APP_Client_Address}/${q._id}`}
                      >
                        <IconButton>
                          <ContentCopy />
                        </IconButton>
                      </CopyToClipboard>
                    ),
                  ]}
                />
              </div>

              <Snackbar
                open={snackBarOpen ? true : false}
                autoHideDuration={3000}
                onClose={() => setSnackBarOpen(undefined)}
                message={snackBarOpen}
              />
            </>
          ) : (
            <div className="row questions_list"></div>
          )}

          <div className="row">
            <Link to="Create">
              <Button variant="contained" sx={{ width: "100%" }}>
                <Add />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default SearchQuiz;
