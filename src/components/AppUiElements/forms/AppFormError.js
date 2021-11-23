import { FormHelperText } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormError({ name }) {
  const { errors, touched } = useFormikContext();

  return touched[name] && errors[name] ? (
    <FormHelperText error={true}>{errors[name]}</FormHelperText>
  ) : (
    ""
  );
}

export default AppFormError;
