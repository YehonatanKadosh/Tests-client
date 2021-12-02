import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, DocumentScanner, Edit, Upgrade } from "@mui/icons-material";
import {
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

function QuestionsTable({ items }) {
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const { values } = useFormikContext();
  const topics = useSelector(get_topics);
  const tags = useSelector(get_all_tags);
  const dispatch = useDispatch();

  const filteredQuestion = () => {
    const tag = values.tag?._id;
    const topic = values.topic?._id;

    let predicate;
    if (tag && topic)
      predicate = (Q) => Q.tags?.includes(tag) && Q.topics?.includes(topic);
    else if (tag) predicate = (Q) => Q.tags?.includes(tag);
    else if (topic) predicate = (Q) => Q.topics?.includes(topic);
    else return items;
    return items.filter(predicate);
  };

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

  return (
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
          {prepareQuestions(filteredQuestion()).map((Q) => (
            <TableRow key={Q._id} hover>
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
      </Table>
      {selectedQuestion && (
        <Dialog
          onClose={() => setSelectedQuestion(undefined)}
          open={selectedQuestion ? true : false}
        >
          {selectedQuestion}
        </Dialog>
      )}
    </TableContainer>
  );
}

export default QuestionsTable;
