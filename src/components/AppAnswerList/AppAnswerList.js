import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { orientationTypes, questionTypes } from "queezy-common";
import "./AppAnswerList.css";

function AppAnswerList({ answers, type, orientation, forShow }) {
  const { values } = useFormikContext();
  const SingleChoice = type === questionTypes.SingleChoice;
  const isVertical = orientation === orientationTypes.Vertical;

  const onChange = (index, answer, push, remove) =>
    forShow
      ? () => {
          if (
            values["answers"] &&
            values["answers"][index] &&
            !values["answers"][index].includes(answer)
          )
            push(answer);
          else remove(answer);
        }
      : () => {};

  const multipleChoiceCheckBox = (push, remove) => (
    <FormGroup className={isVertical ? "vertical" : "horizontal"}>
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            className="justify-content-between"
            control={
              <Checkbox onChange={onChange(index, answer, push, remove)} />
            }
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </FormGroup>
  );

  const singleChoiceRadioBox = (push, remove) => (
    <RadioGroup
      className={isVertical ? "vertical" : "horizontal"}
      aria-label="answers"
      name="radio-buttons-group"
    >
      {answers.map((answer, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            value={index}
            control={<Radio onChange={onChange(index, answer, push, remove)} />}
            label={answer.content}
          />
        </React.Fragment>
      ))}
    </RadioGroup>
  );

  return (
    <FieldArray
      name="answers"
      render={({ push, remove }) => (
        <div className="row">
          <div className="text-center">
            {SingleChoice
              ? singleChoiceRadioBox(push, remove)
              : multipleChoiceCheckBox(push, remove)}
          </div>
        </div>
      )}
    />
  );
}

export default AppAnswerList;
