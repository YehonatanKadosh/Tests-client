import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function QuestionsTable({ items }) {
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
          {items.map((Q) => (
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
