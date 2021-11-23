import { Add, Delete } from "@mui/icons-material";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import AccordionBase from "./AccordionBase";

function AppFormListBuilder(props) {
  const { values } = useFormikContext();

  return (
    <FieldArray
      name={props.name}
      render={({ push, remove, replace }) => (
        <AccordionBase
          {...props}
          headerContent={`: ${values[props.name].length}`}
          detailsContent={
            <>
              {values[props.name].map((element, index) => (
                <Paper
                  variant="outlined"
                  key={index}
                  sx={{ display: "flex", width: "100%", m: 1 }}
                >
                  <IconButton>{index + 1}</IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={props.placeHolder}
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={(e) => replace(index, e.target.value)}
                    value={element}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={() => remove(element)}
                  >
                    <Delete />
                  </IconButton>
                </Paper>
              ))}
              <Button
                onClick={() => push({ content: "", isRight: false })}
                sx={{ width: "100%" }}
              >
                <Add />
              </Button>
            </>
          }
        />
      )}
    />
  );
}

export default AppFormListBuilder;
