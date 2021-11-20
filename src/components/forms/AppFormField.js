import { FormHelperText, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormField(props) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <TextField
        margin={props.margin}
        autoComplete={props.autoComplete}
        name={props.name}
        required={props.required}
        fullWidth={props.fullWidth}
        id={props.id}
        label={props.label}
        type={props.type}
        onChange={handleChange(props.name)}
        onBlur={() => {
          setFieldTouched(props.name);
        }}
        error={touched[props.name] && errors[props.name] ? true : false}
      />
      {touched[props.name] && errors[props.name] && (
        <FormHelperText error={true}>{errors[props.name]}</FormHelperText>
      )}
    </>
  );
}
export default AppFormField;
