import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import AccordionBase from "./AccordionBase";

function AppFormChoiceList(props) {
  const { values, setFieldValue } = useFormikContext();
  return (
    <AccordionBase
      {...props}
      headerContent={
        values[props.name] && (
          <Button
            className="mx-1"
            variant="contained"
            endIcon={<Delete />}
            onClick={() => setFieldValue(props.name, "")}
          >
            {values[props.name]}
          </Button>
        )
      }
      detailsContent={Object.values(props.enum).map((element) => (
        <Button
          className="mx-1"
          variant="outlined"
          key={element}
          onClick={() => setFieldValue(props.name, element)}
        >
          {element}
        </Button>
      ))}
    />
  );
}

export default AppFormChoiceList;
