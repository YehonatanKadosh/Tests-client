import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, DocumentScanner, Edit, Upgrade } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import CreateQuestion from "../Create/QuestionCreate";
import QuestionShow from "../Show/QuestionShow";
import { deleteQuestion } from "../../../../redux/api";
import { get_all_tags } from "../../../../redux/reducers/tag";
import { get_topics } from "../../../../redux/reducers/topic";
import {
  get_questions,
  get_questions_status,
} from "../../../../redux/reducers/questions";
import { FieldArray, useFormikContext } from "formik";

function QuestionsTable({ Builder }) {
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const topics = useSelector(get_topics);
  const tags = useSelector(get_all_tags);
  const questions = useSelector(get_questions);
  const questionsStatus = useSelector(get_questions_status);
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  const prepareQuestions = (questions) => {
    const prepared = [];
    questions.forEach((question) => {
      prepared.push({
        ...question,
        tags: question.tags.map((tagId) => tags.find((t) => t._id === tagId)),
        topics: question.topics.map((topicId) =>
          topics.find((t) => t._id === topicId)
        ),
      });
    });
    return prepared;
  };

  const tableContent = ({ push, remove }) =>
    !questionsStatus ? (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Show</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Clone</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prepareQuestions(questions).map((Q) => (
              <TableRow
                onClick={() => {
                  if (Builder) {
                    if (!values["questions"].includes(Q._id)) push(Q._id);
                    else remove(values["questions"].indexOf(Q._id));
                  }
                }}
                key={Q._id}
                hover
                sx={
                  values["questions"].includes(Q._id)
                    ? { backgroundColor: "lightgray" }
                    : undefined
                }
              >
                <TableCell>{Q.question}</TableCell>
                <TableCell>
                  {Q.topics.map((topic, index) => (
                    <div key={index}>{topic?.name}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {Q.tags.map((tag, index) => (
                    <div key={index}>{tag?.name}</div>
                  ))}
                </TableCell>
                <TableCell>{Q.lastUpdated}</TableCell>
                <TableCell>{Q.version}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setSelectedQuestion(<QuestionShow forShow {...Q} />)
                    }
                  >
                    <DocumentScanner />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setSelectedQuestion(
                        <CreateQuestion
                          CB={() => setSelectedQuestion(undefined)}
                          Q={Q}
                        />
                      )
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      setSelectedQuestion(
                        <CreateQuestion
                          CB={() => setSelectedQuestion(undefined)}
                          update
                          Q={Q}
                        />
                      )
                    }
                  >
                    <Upgrade />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => dispatch(deleteQuestion(Q._id))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {selectedQuestion && (
            <Dialog
              onClose={() => setSelectedQuestion(undefined)}
              open={selectedQuestion ? true : false}
            >
              {selectedQuestion}
            </Dialog>
          )}
        </Table>
      </TableContainer>
    ) : (
      <CircularProgress />
    );

  return Builder ? (
    <FieldArray name="questions">
      {(FormikArray) => tableContent(FormikArray)}
    </FieldArray>
  ) : (
    tableContent()
  );
}

export default QuestionsTable;
