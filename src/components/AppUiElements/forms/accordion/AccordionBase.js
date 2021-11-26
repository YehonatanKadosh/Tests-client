import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import { AccordionContext } from "../../../Question/Question.create";

function AccordionBase({ title, name, headerContent, detailsContent }) {
  const { touched, errors, setFieldTouched } = useFormikContext();
  const { expanded, handleChange } = useContext(AccordionContext);
  return (
    <Accordion
      onFocus={() => setFieldTouched(name)}
      expanded={expanded === name}
      onChange={handleChange(name)}
    >
      <AccordionSummary aria-controls={`${name}-content`} id={`${name}-header`}>
        <Typography>
          {title}
          {headerContent}
        </Typography>
        {touched[name] && errors[name] && (
          <FormHelperText error={true}>
            {typeof errors[name] === "string"
              ? errors[name]
              : "missing information"}
          </FormHelperText>
        )}
      </AccordionSummary>
      <AccordionDetails>{detailsContent}</AccordionDetails>
    </Accordion>
  );
}

export default AccordionBase;
