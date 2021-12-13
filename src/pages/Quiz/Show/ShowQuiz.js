import { LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionShowPage } from "../..";
import {
  changeAnswer,
  get_answered_questions_amount,
  get_quiz,
  wipeQuiz,
} from "../../../redux/reducers/quiz";
import { get_quizRecord, wipeRecord } from "../../../redux/reducers/quizRecord";
import { AppSlider } from "../../../UiElements";
import IntroductionPage from "./IntroductionPage";
import "./quiz.css";
import SummaryPage from "./SummaryPage";

function ShowQuiz({ forShow }) {
  const { questions, name, answersReview, language } = useSelector(get_quiz);
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(get_answered_questions_amount);
  const { quiz: storedQuiz } = useSelector(get_quizRecord);

  useEffect(() => {
    return () => {
      dispatch(wipeQuiz());
      dispatch(wipeRecord());
    };
  }, [dispatch]);
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
            !storedQuiz || answersReview || storedQuiz?.questions
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
                            storedQuiz
                              ? storedQuiz.questions[index].answers
                              : undefined
                          }
                          {...question}
                          language={language}
                        />
                      ))
                    : []),
                  <SummaryPage forShow={forShow} />,
                ]
              : [<SummaryPage forShow={forShow} />]
          }
        />
      </div>
      {questions && answeredQuestions ? (
        <LinearProgress
          variant="determinate"
          value={(answeredQuestions / questions?.length) * 100}
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
