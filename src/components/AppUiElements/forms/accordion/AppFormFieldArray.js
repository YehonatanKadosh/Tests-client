import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import AccordionBase from "./AccordionBase";

function AppFormFieldArray(props) {
  const { values } = useFormikContext();
  return (
    <FieldArray
      name={props.name}
      render={({ push, remove }) => (
        <props.Selector
          onSelected={(value) => {
            if (!values[props.name].includes(value)) push(value);
          }}
        />
      )}
    />
  );
}

export default AppFormFieldArray;
