import { Quiz, QuestionAnswer, SportsScore, Grade } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { quizRecord_validator } from "quizy-yk-common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitQuiz } from "../../../redux/api";
import {
  get_answered_questions_amount,
  get_quiz,
} from "../../../redux/reducers/quiz";
import { get_quizRecord } from "../../../redux/reducers/quizRecord";

const InformationBanner = ({ Icon, content, sx }) => (
  <Typography sx={sx || { mb: 2 }}>
    {Icon && <Icon sx={{ mr: 0.5 }} />}
    {content}
  </Typography>
);

function SummaryPage({ forShow }) {
  const quiz = useSelector(get_quiz);
  const answeredQuestions = useSelector(get_answered_questions_amount);
  const { finalScore, questionsAnswered, _id } = useSelector(get_quizRecord);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const data = { quiz, date: new Date() };
      await quizRecord_validator.validate(data);
      dispatch(submitQuiz(data));
    } catch (error) {
      console.log(error);
    }
  };

  return !_id ? (
    <div>
      <InformationBanner
        Icon={Quiz}
        content={`Questions Amount: ${quiz.questions.length}`}
      />
      <InformationBanner
        Icon={QuestionAnswer}
        content={`Answered Questions: ${answeredQuestions}`}
      />
      <InformationBanner
        Icon={Grade}
        content={`Maximum Score: ${
          (100 * answeredQuestions) / quiz.questions.length
        }`}
      />
      <InformationBanner
        Icon={SportsScore}
        content={`Passing Score: ${quiz.passingScore}`}
        sx={{ mb: 3 }}
      />
      {forShow ? (
        <Typography>This exam is for show only</Typography>
      ) : (
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      )}
    </div>
  ) : (
    <div>
      <InformationBanner
        Icon={Grade}
        sx={{ mb: 2, color: finalScore >= quiz.passingScore ? "green" : "red" }}
        content={`Score: ${finalScore}`}
      />
      <InformationBanner
        Icon={QuestionAnswer}
        content={`Answered Questions: ${questionsAnswered}`}
      />
      <InformationBanner
        Icon={SportsScore}
        content={`Passing Score: ${quiz.passingScore}`}
      />
      <InformationBanner
        content={
          finalScore >= quiz.passingScore
            ? quiz.successMessage
            : quiz.failMessage
        }
      />
      {quiz.answersReview && (
        <InformationBanner
          sx={{ color: "green" }}
          content="review is enabled"
        />
      )}
      <InformationBanner content="Quiz sent successfully" />
    </div>
  );
}

export default SummaryPage;
