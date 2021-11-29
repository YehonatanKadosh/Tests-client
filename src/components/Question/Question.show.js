import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AppAnswerList from "../AppAnswerList/AppAnswerList";

function QuestionShow(props) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.question}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.context}
        </Typography>
        <AppAnswerList forShow={props.forShow} {...props} />
      </CardContent>
    </Card>
  );
}

export default QuestionShow;
