import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormCheckbox({ label, name, checked }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => setFieldValue(name, !values[name])}
          value={name}
          color="primary"
          checked={values[name]}
        />
      }
      label={label}
    />
  );
}

export default AppFormCheckbox;
