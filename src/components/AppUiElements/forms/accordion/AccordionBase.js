import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AccordionBase({
  expanded,
  title,
  handleChange,
  name,
  headerContent,
  detailsContent,
}) {
  const { touched, errors, setFieldTouched } = useFormikContext();
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
          <FormHelperText error={true}>{errors[name]}</FormHelperText>
        )}
      </AccordionSummary>
      <AccordionDetails>{detailsContent}</AccordionDetails>
    </Accordion>
  );
}

export default AccordionBase;
