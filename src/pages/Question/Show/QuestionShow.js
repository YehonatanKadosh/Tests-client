import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { languages, orientationTypes, questionTypes } from "quizy-yk-common";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeHeader, setHeader } from "../../../redux/reducers/header";
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
  language,
}) {
  const SingleChoice = type === questionTypes.SingleChoice;
  const isVertical = orientation === orientationTypes.Vertical;
  const isHebrew = language === languages.Hebrew;
  const dispatch = useDispatch();

  const className = `${isVertical ? "vertical" : "horizontal"} ${
    isHebrew ? "hebrew" : "english"
  }`;

  const multipleChoiceCheckBox = (replace) => (
    <FormGroup className={className}>
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
                  !rightAnswers && onAnswersChange
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
      className={className}
      aria-label="answers"
      name="radio-buttons-group"
    >
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            sx={
              rightAnswers && rightAnswers[index]
                ? { color: rightAnswers[index].isRight ? "green" : "red" }
                : {}
            }
            value={index}
            control={
              <Radio
                checked={answer.isRight}
                onChange={
                  !rightAnswers && onAnswersChange
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

  useEffect(() => {
    dispatch(setHeader("Question"));
    return () => dispatch(removeHeader());
  }, [dispatch]);

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
