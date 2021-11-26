import { Autocomplete, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { createFilterOptions } from "@mui/base";

const filter = createFilterOptions();

function AppSelector({
  name,
  valuesSelector,
  valuesStatusSelector,
  addHandler,
  disabled,
}) {
  const values = useSelector(valuesSelector);
  const loadingValues = useSelector(valuesStatusSelector);
  const { setFieldValue } = useFormikContext();

  return (
    <Autocomplete
      onChange={(event, newValue) => {
        if (typeof lastAddedValue === "string") addHandler(lastAddedValue);
        else setFieldValue(name, newValues);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue && !options.includes(params.inputValue))
          filtered.push({ name: `Add "${params.inputValue}"` });
        return filtered;
      }}
      options={values}
      disabled={loadingValues || disabled}
      selectOnFocus
      handleHomeEndKeys
      renderOption={(props, option) => (
        <li key={option._id} {...props}>
          {option.name}
        </li>
      )}
      sx={{ width: "50%", p: 1 }}
      freeSolo
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={name} />}
    />
  );
}

export default AppSelector;
