import { FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormField(props) {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  return (
    <>
      <TextField
        {...props}
        onChange={(e) => setFieldValue(props.name, e.target.value.trim())}
        onBlur={() => {
          setFieldTouched(props.name);
        }}
        error={
          touched[props.name] && errors[props.name]
            ? errors[props.name]
            : undefined
        }
      />
      {!props.extraErrordisabled &&
        touched[props.name] &&
        errors[props.name] && (
          <FormHelperText error={true}>{errors[props.name]}</FormHelperText>
        )}
    </>
  );
}
export default AppFormField;
