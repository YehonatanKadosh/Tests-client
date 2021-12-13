import React from "react";
import { Route, Routes } from "react-router";
import { ReportPage } from "../pages";

function ReportRouts() {
  return (
    <Routes>
      <Route path="*" element={<ReportPage />} />
    </Routes>
  );
}

export default ReportRouts;
