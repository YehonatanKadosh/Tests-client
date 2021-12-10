import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { orientationTypes, questionTypes } from "quizy-yk-common";
import React from "react";
import "./QuestionShow.css";

function QuestionShow({
  _id,
  type,
  orientation,
  answers,
  rightAnswers,
  question,
  context,
  onAnswersChange,
}) {
  const SingleChoice = type === questionTypes.SingleChoice;
  const isVertical = orientation === orientationTypes.Vertical;

  const multipleChoiceCheckBox = (replace) => (
    <FormGroup className={isVertical ? "vertical" : "horizontal"}>
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            className="justify-content-between"
            sx={
              rightAnswers
                ? { color: rightAnswers[index].isRight ? "green" : "red" }
                : {}
            }
            control={
              <Checkbox
                checked={answer.isRight}
                onChange={
                  !rightAnswers
                    ? () =>
                        onAnswersChange({
                          questionId: _id,
                          answerId: answer._id || index,
                          type,
                        })
                    : undefined
                }
              />
            }
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </FormGroup>
  );

  const singleChoiceRadioBox = (replace) => (
    <RadioGroup
      className={isVertical ? "vertical" : "horizontal"}
      aria-label="answers"
      name="radio-buttons-group"
    >
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            sx={
              rightAnswers
                ? { color: rightAnswers[index].isRight ? "green" : "red" }
                : {}
            }
            value={index}
            control={
              <Radio
                checked={answer.isRight}
                onChange={
                  !rightAnswers
                    ? () =>
                        onAnswersChange({
                          questionId: _id,
                          answerId: answer._id || index,
                          type,
                        })
                    : undefined
                }
              />
            }
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </RadioGroup>
  );

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {question}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {context}
      </Typography>
      {answers && (
        <div className="row text-center">
          {SingleChoice ? singleChoiceRadioBox() : multipleChoiceCheckBox()}
        </div>
      )}
    </div>
  );
}

export default QuestionShow;
