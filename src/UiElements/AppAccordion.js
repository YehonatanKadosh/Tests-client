import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { AccordionContext } from "../pages/Admin/Queez/Create/CreateQueez";

function AppAccordion({ icon, title, errors, children }) {
  const context = useContext(AccordionContext);
  return (
    <Accordion
      expanded={context.expanded === `${title}`}
      onChange={context.handleChange(`${title}`)}
    >
      <AccordionSummary
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Typography className="align-self-center">
          {icon}
          {" " + title}
        </Typography>
        {errors}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default AppAccordion;
