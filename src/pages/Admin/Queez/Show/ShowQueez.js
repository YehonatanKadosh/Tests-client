import { LinearProgress, Typography, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionShowPage } from "../../..";
import {
  changeAnswer,
  get_answered_questions_amount,
  get_queez,
} from "../../../../redux/reducers/queez";
import { AppSlider } from "../../../../UiElements";

function ShowQueez({ forShow }) {
  const { questions, introduction, name } = useSelector(get_queez);
  const dispatch = useDispatch();
  const answeredQuestions = useSelector(get_answered_questions_amount);

  return questions || introduction || name ? (
    <>
      {name && (
        <Typography
          variant="h5"
          component="div"
          sx={{ backgroundColor: "lightblue", textAlign: "center" }}
        >
          {name}
        </Typography>
      )}
      <AppSlider
        items={[
          introduction ? (
            <Typography>{introduction}</Typography>
          ) : (
            "No introduction"
          ),
          ...(questions
            ? questions.map((question) => (
                <QuestionShowPage
                  onAnswersChange={(payload) => dispatch(changeAnswer(payload))}
                  {...question}
                />
              ))
            : []),
          forShow ? (
            <div>This exam is for show only</div>
          ) : (
            <Button>Submit</Button>
          ),
        ]}
      />
      {questions && answeredQuestions ? (
        <LinearProgress
          variant="determinate"
          value={(answeredQuestions / questions.length) * 100}
        />
      ) : (
        ""
      )}
    </>
  ) : (
    "Nothing to preview yet"
  );
}

export default ShowQueez;
