import { ContentCopy } from "@mui/icons-material";
import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { QuizCreatePage } from "../..";
import { addTopic, deleteQuiz, getQuizzes } from "../../../redux/api";
import { setQuiz } from "../../../redux/reducers/quiz";
import {
  get_quizzes,
  get_quizzes_loading,
  wipeAllQuizzes,
} from "../../../redux/reducers/quizzes";
import { get_topics, get_topics_loading } from "../../../redux/reducers/topic";
import { AppSelector, AppTable } from "../../../UiElements";
import { CopyToClipboard } from "react-copy-to-clipboard";

function SearchQuiz() {
  const dispatch = useDispatch();
  const quizzes = useSelector(get_quizzes);
  const loading = useSelector(get_quizzes_loading);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    return () => dispatch(wipeAllQuizzes());
  }, [dispatch]);

  return (
    <Formik initialValues={{ topic: "", partialName: "" }}>
      {({ setFieldValue, values }) => (
        <div className="container-fluid questions_container p-3">
          <div className="row">
            <div className="col">
              <AppSelector
                name="topic"
                valuesSelector={get_topics}
                valuesStatusSelector={get_topics_loading}
                apiCall={(topic) =>
                  addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
                }
                onChange={(topic) => dispatch(getQuizzes({ topic }))}
                onEmpty={() => dispatch(wipeAllQuizzes())}
              />
            </div>
            <div className="col">
              <TextField
                label="partial name"
                sx={{ width: "100%" }}
                variant="outlined"
                value={values.partialName || ""}
                onChange={(e) => setFieldValue("partialName", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && values.partialName?.trim().length)
                    dispatch(
                      getQuizzes({
                        topic: values.topic,
                        partialName: values.partialName.trim(),
                      })
                    );
                }}
              />
            </div>
          </div>

          {quizzes.length ? (
            <>
              <div className="row questions_list">
                <AppTable
                  collection={quizzes}
                  loading={loading}
                  onShow={(Q) => {
                    dispatch(setQuiz(Q));
                    return <QuizCreatePage forShow />;
                  }}
                  onEdit={(Q, onSave) => (
                    <QuizCreatePage onSave={onSave} Q={Q} />
                  )}
                  onUpdate={(Q, onSave) => (
                    <QuizCreatePage onSave={onSave} update Q={Q} />
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
                Create Quiz
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default SearchQuiz;
