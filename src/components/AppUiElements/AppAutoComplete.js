import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

const AppAutoComplete = (props) => {
  return (
    <React.Fragment>
      <Autocomplete
        onChange={(event, newValue) => {
          if (newValue) {
            const newChoice = (
              newValue.startsWith("Add ") ? newValue.split(`"`)[1] : newValue
            ).trim();
            props.setValue(newChoice);
            if (!props.options.includes(newChoice)) {
              props.handleSubmit(newChoice);
            }
            if (props.onSelected) props.onSelected(newChoice);
          } else props.setValue("");
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue && !options.includes(params.inputValue))
            filtered.push(`Add "${params.inputValue}"`);
          return filtered;
        }}
        options={props.options}
        selectOnFocus
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option}</li>}
        sx={{ width: "50%" }}
        freeSolo
        renderInput={(params) => <TextField {...params} label={props.label} />}
      />
    </React.Fragment>
  );
};

export default AppAutoComplete;
