import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormField(props) {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  return (
    <TextField
      {...props}
      onChange={(e) => setFieldValue(props.name, e.target.value.trim())}
      onBlur={() => {
        setFieldTouched(props.name);
      }}
      error={touched[props.name] && errors[props.name] ? true : false}
    />
  );
}
export default AppFormField;
