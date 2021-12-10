import { Quiz, QuestionAnswer, SportsScore, Grade } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  get_answered_questions_amount,
  get_quiz,
} from "../../../redux/reducers/quiz";

function SummaryPage({ forShow }) {
  const { questions, passingScore } = useSelector(get_quiz);
  const answeredQuestions = useSelector(get_answered_questions_amount);

  const handleSubmit = () => {
    console.log(questions);
  };

  return (
    <div>
      <Typography sx={{ mb: 2 }}>
        <Quiz /> Questions Amount: {questions.length}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <QuestionAnswer />
        Answered Questions: {answeredQuestions}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <Grade />
        Maximum Score: {(100 * answeredQuestions) / questions.length}
      </Typography>
      <Typography sx={{ mb: 3 }}>
        <SportsScore />
        Passing Score: {passingScore}
      </Typography>
      {forShow ? (
        <Typography>This exam is for show only</Typography>
      ) : (
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      )}
    </div>
  );
}

export default SummaryPage;
