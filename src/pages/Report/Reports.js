import { AccountCircle, DocumentScanner } from "@mui/icons-material";
import { Tabs, Tab, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import QuizReport from "./type/QuizReport";
import StudentReport from "./type/StudentReport";
import "./Report.css";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className="report-container"
      {...other}
    >
      {children}
    </div>
  );
}

function Reports() {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  return (
    <Box className="report-container">
      {value === 0 && (
        <TabPanel
          value={value}
          children={<StudentReport />}
          index={0}
          dir={theme.direction}
        />
      )}
      {value === 1 && (
        <TabPanel
          children={<QuizReport />}
          value={value}
          index={1}
          dir={theme.direction}
        />
      )}
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        centered
        variant="fullWidth"
      >
        <Tab iconPosition="start" icon={<AccountCircle />} label="Student" />
        <Tab iconPosition="start" icon={<DocumentScanner />} label="Quiz" />
      </Tabs>
    </Box>
  );
}

export default Reports;
