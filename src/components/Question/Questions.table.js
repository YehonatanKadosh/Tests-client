import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { get_all_tags } from "../../redux/reducers/tag";
import { get_topics } from "../../redux/reducers/topic";
import QuestionShow from "./Question.show";

function QuestionsTable({ items }) {
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const { values } = useFormikContext();
  const topics = useSelector(get_topics);
  const tags = useSelector(get_all_tags);

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

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Topics</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredQuestion().map((Q) => (
            <TableRow
              key={Q._id}
              onClick={() =>
                setSelectedQuestion(<QuestionShow forShow {...Q} />)
              }
              hover
            >
              <TableCell>{Q.question}</TableCell>
              <TableCell>
                {Q.tags.map((tagId) => tags.find((t) => t._id === tagId)?.name)}
              </TableCell>
              <TableCell>
                {Q.topics.map(
                  (topicId) => topics.find((t) => t._id === topicId)?.name
                )}
              </TableCell>
              <TableCell>{Q.lastUpdated}</TableCell>
              <TableCell>{Q.version}</TableCell>
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
