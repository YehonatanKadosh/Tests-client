import { LinearProgress, Typography, Button } from "@mui/material";
import { typography } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionShowPage } from "../../..";
import {
  changeAnswer,
  get_answered_questions_amount,
  get_queez,
} from "../../../../redux/reducers/queez";
import { AppSlider } from "../../../../UiElements";
import IntroductionPage from "./IntroductionPage";
import "./queez.css";
import SummaryPage from "./SummaryPage";

function ShowQueez({ forShow }) {
  const { questions, name } = useSelector(get_queez);
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(get_answered_questions_amount);

  return questions || name ? (
    <div className="queez-show-container">
      {name && (
        <Typography
          variant="h5"
          component="div"
          sx={{ backgroundColor: "lightblue", textAlign: "center" }}
        >
          {name}
        </Typography>
      )}
      <div className="queez-slider">
        <AppSlider
          items={[
            <IntroductionPage />,
            ...(questions
              ? questions.map((question) => (
                  <QuestionShowPage
                    onAnswersChange={(payload) =>
                      dispatch(changeAnswer(payload))
                    }
                    {...question}
                  />
                ))
              : []),
            forShow ? <div>This exam is for show only</div> : <SummaryPage />,
          ]}
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

export default ShowQueez;
