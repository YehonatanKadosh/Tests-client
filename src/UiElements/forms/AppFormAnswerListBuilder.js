import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { questionTypes } from "quizy-yk-common";

function AppFormAnswerListBuilder(props) {
  const { values, errors, touched } = useFormikContext();
  const SingleChoice = values["type"] === questionTypes.SingleChoice;

  const label = (replace, remove, index, item) => (
    <>
      <InputBase
        placeholder={props.placeHolder}
        inputProps={{
          "aria-label": "search google maps",
        }}
        onChange={(e) =>
          replace(index, {
            ...item,
            content: e.target.value,
          })
        }
        sx={{ flex: 1 }}
        value={item.content}
      />
      <IconButton
        type="submit"
        sx={{ p: 1 }}
        aria-label="search"
        onClick={() => remove(index)}
      >
        <Delete />
      </IconButton>
    </>
  );

  const error = (index) =>
    touched[props.name] &&
    errors[props.name] && (
      <FormHelperText error={true}>
        {errors[props.name][index]?.content}
      </FormHelperText>
    );

  const multipleChoiceCheckBox = (replace, remove) => (
    <FormGroup>
      {values[props.name].map((item, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            className="justify-content-between"
            control={
              <Checkbox
                checked={item.isRight}
                onChange={() =>
                  replace(index, {
                    ...item,
                    isRight: !item.isRight,
                  })
                }
              />
            }
            label={label(replace, remove, index, item)}
          />
          {error(index)}
        </React.Fragment>
      ))}
    </FormGroup>
  );

  const singleChoiceRadioBox = (replace, remove) => (
    <RadioGroup aria-label="answers" name="radio-buttons-group">
      {values[props.name].map((item, index) => (
        <React.Fragment key={index}>
          <FormControlLabel
            value={index}
            control={
              <Radio
                checked={item.isRight}
                onChange={() => {
                  values[props.name].forEach((answer, i) => {
                    if (i !== index && answer.isRight)
                      replace(i, { ...answer, isRight: false });
                  });
                  replace(index, { ...item, isRight: true });
                }}
              />
            }
            label={label(replace, remove, index, item)}
          />
          {error(index)}
        </React.Fragment>
      ))}
    </RadioGroup>
  );

  return (
    <FieldArray
      name={props.name}
      render={({ push, remove, replace }) => (
        <div className="row text-center">
          {SingleChoice
            ? singleChoiceRadioBox(replace, remove)
            : multipleChoiceCheckBox(replace, remove)}

          <Button
            onClick={() => push({ content: "", isRight: false })}
            variant="contained"
            sx={{ width: "fit-content", my: 1 }}
          >
            <Add /> {props.placeHolder}
          </Button>
          {touched[props.name] && typeof errors[props.name] === "string" && (
            <FormHelperText className="text-center" error={true}>
              {errors[props.name]}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

export default AppFormAnswerListBuilder;
