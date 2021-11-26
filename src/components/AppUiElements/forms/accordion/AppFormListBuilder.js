import {
  Add,
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Label,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { questionTypes } from "../../../../enums";

function AppFormListBuilder(props) {
  const { values, errors, touched } = useFormikContext();
  const error = values["type"] === questionTypes.SingleChoice;
  return (
    <FieldArray
      name={props.name}
      render={({ push, remove, replace }) => (
        <div className="row">
          <Box sx={{ display: "flex" }}>
            <FormControl
              sx={{ m: 3, width: "100%" }}
              component="fieldset"
              variant="standard"
              error={error}
            >
              <FormGroup>
                {values[props.name].map((item, index) => (
                  <>
                    <FormControlLabel
                      className="justify-content-between"
                      control={
                        <Checkbox
                          checked={item.isRight}
                          onChange={() =>
                            replace(index, { ...item, isRight: !item.isRight })
                          }
                          name="gilad"
                        />
                      }
                      label={
                        <>
                          <InputBase
                            placeholder={props.placeHolder}
                            inputProps={{ "aria-label": "search google maps" }}
                            onChange={(e) =>
                              replace(index, {
                                ...item,
                                content: e.target.value,
                              })
                            }
                            sx={{ flex: 1 }}
                            value={item.content}
                          />
                          <IconButton
                            type="submit"
                            sx={{ p: 1 }}
                            aria-label="search"
                            onClick={() => remove(index)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      }
                    />
                    {touched[props.name] && errors[props.name] && (
                      <FormHelperText error={true}>
                        {errors[props.name][index]?.content}
                      </FormHelperText>
                    )}
                  </>
                ))}
              </FormGroup>
            </FormControl>
          </Box>

          {/* <div className="list_builder_list_item w-100 my-1" key={index}>
              <Paper
                variant="outlined"
                sx={{
                  borderColor:
                    touched[props.name] &&
                    errors[props.name] &&
                    errors[props.name][index]
                      ? "red"
                      : undefined,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  onClick={() =>
                    replace(index, { ...item, isRight: !item.isRight })
                  }
                >
                  {item.isRight ? <CheckBox /> : <CheckBoxOutlineBlank />}
                </IconButton>
                <InputBase
                  sx={{ flex: 1 }}
                  placeholder={props.placeHolder}
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) =>
                    replace(index, { ...item, content: e.target.value })
                  }
                  value={item.content}
                />
                <IconButton
                  type="submit"
                  sx={{ p: 1 }}
                  aria-label="search"
                  onClick={() => remove(index)}
                >
                  <Delete />
                </IconButton>
              </Paper>
              
            </div>
          ))} */}
          <div className="text-center">
            <Button
              onClick={() => push({ content: "", isRight: false })}
              variant="contained"
              sx={{ width: "fit-content", my: 1 }}
            >
              <Add /> {props.placeHolder}
            </Button>
            {touched[props.name] && typeof errors[props.name] === "string" && (
              <FormHelperText className="text-center" error={true}>
                {errors[props.name]}
              </FormHelperText>
            )}
          </div>
        </div>
      )}
    />
  );
}

export default AppFormListBuilder;
