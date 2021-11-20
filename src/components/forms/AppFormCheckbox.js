import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormCheckbox({ label, name }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => setFieldValue(name, !values[name])}
          value={name}
          color="primary"
        />
      }
      label={label}
    />
  );
}

export default AppFormCheckbox;
