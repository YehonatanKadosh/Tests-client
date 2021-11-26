import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createFilterOptions } from "@mui/base";
import { useFormikContext } from "formik";

const filter = createFilterOptions();

function AppMultipleSelector({
  name,
  valuesSelector,
  valuesStatusSelector,
  disabled,
  disabledPlaceholder,
  multiple,
  apiCall,
  onEmpty,
}) {
  const options = useSelector(valuesSelector);
  const loadingValues = useSelector(valuesStatusSelector);
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  return (
    <Autocomplete
      onChange={(event, newValue) => {
        if (multiple) {
          if (newValue.length) {
            const lastAddedValue = newValue[newValue.length - 1];
            if (typeof lastAddedValue === "string")
              dispatch(apiCall(lastAddedValue));
            else setFieldValue(name, newValue);
          } else {
            setFieldValue(name, []);
            if (onEmpty) onEmpty();
          }
        } else {
          if (typeof newValue === "string") dispatch(apiCall(newValue));
          else setFieldValue(name, newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (
          apiCall &&
          params.inputValue.trim() &&
          !options.includes(params.inputValue)
        )
          filtered.push({ name: `Add "${params.inputValue}"` });
        return filtered;
      }}
      options={options}
      disabled={loadingValues || disabled}
      selectOnFocus
      value={values[name]}
      handleHomeEndKeys
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      multiple={multiple}
      freeSolo
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          error={touched[name] && errors[name] ? true : false}
          {...params}
          label={disabled && disabledPlaceholder ? disabledPlaceholder : name}
        />
      )}
    />
  );
}

export default AppMultipleSelector;
