import { TextField } from "@mui/material";
import { ErrorMessage, useFormikContext } from "formik";
import React from "react";

function AppFormField({
  name,
  required,
  autoComplete,
  fullWidth,
  id,
  label,
  type,
}) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <TextField
        autoComplete={autoComplete}
        name={name}
        required={required}
        fullWidth={fullWidth}
        id={id}
        label={label}
        type={type}
        onChange={handleChange(name)}
        onBlur={() => {
          setFieldTouched(name);
        }}
        error={touched[name] && errors[name] ? true : false}
      />
      <ErrorMessage name={name} />
    </>
  );
}
export default AppFormField;
