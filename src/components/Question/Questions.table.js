import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function QuestionsTable({ items }) {
  const { values } = useFormikContext();

  const filteredQuestion = () => {
    const tag = values.tag;
    const topic = values.topic;
    let predicate;
    if (tag && topic)
      predicate = (Q) => Q.tags.includes(tag) && Q.topic.includes(topic);
    else if (tag) predicate = (Q) => Q.tags.includes(tag);
    else if (topic) predicate = (Q) => Q.topic.includes(topic);
    else return items;
    return items.filter(predicate);
  };

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Topics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredQuestion().map((Q) => (
            <TableRow>
              <TableCell>{Q.question}</TableCell>
              <TableCell>{Q.tags}</TableCell>
              <TableCell>{Q.topics}</TableCell>
              <TableCell>{Q.lastUpdated}</TableCell>
              <TableCell>{Q.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionsTable;
