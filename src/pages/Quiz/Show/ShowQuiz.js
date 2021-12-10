import { LinearProgress, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionShowPage } from "../..";
import {
  changeAnswer,
  get_answered_questions_amount,
  get_quiz,
} from "../../../redux/reducers/quiz";
import { get_quizRecord } from "../../../redux/reducers/quizRecord";
import { AppSlider } from "../../../UiElements";
import IntroductionPage from "./IntroductionPage";
import "./quiz.css";
import SummaryPage from "./SummaryPage";

function ShowQuiz({ forShow }) {
  const { questions, name, answersReview } = useSelector(get_quiz);
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(get_answered_questions_amount);
  const { quiz } = useSelector(get_quizRecord);

  return questions || name ? (
    <div className="quiz-show-container">
      {name && (
        <Typography
          variant="h5"
          component="div"
          sx={{ backgroundColor: "lightblue", textAlign: "center" }}
        >
          {name}
        </Typography>
      )}
      <div className="quiz-slider">
        <AppSlider
          items={
            answersReview
              ? [
                  <IntroductionPage />,
                  ...(questions
                    ? questions.map((question, index) => (
                        <QuestionShowPage
                          key={index}
                          onAnswersChange={(payload) =>
                            dispatch(changeAnswer(payload))
                          }
                          rightAnswers={
                            quiz ? quiz.questions[index].answers : undefined
                          }
                          {...question}
                        />
                      ))
                    : []),
                  <SummaryPage forShow={forShow} />,
                ]
              : [<SummaryPage />]
          }
        />
      </div>
      {questions && answeredQuestions ? (
        <LinearProgress
          variant="determinate"
          value={(answeredQuestions / questions.length) * 100}
        />
      ) : (
        ""
      )}
    </div>
  ) : (
    "Nothing to preview yet"
  );
}

export default ShowQuiz;
