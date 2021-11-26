import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useFormikContext } from "formik";
import React from "react";

function AppFormChoiceList({ name, Enum }) {
  const { values, setFieldValue } = useFormikContext();
  return (
    <Box sx={{ p: 1 }}>
      <FormControl>
        <InputLabel>{name}</InputLabel>
        <Select
          value={values[name]}
          label={name}
          onChange={(event) => setFieldValue(name, event.target.value)}
        >
          {Object.values(Enum).map((element) => (
            <MenuItem key={element} value={element}>
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default AppFormChoiceList;
