import React from "react";
import { Route, Routes } from "react-router";
import { QuestionCreatePage, QuestionSearchPage } from "../../pages";

function QuestionRouts() {
  return (
    <Routes>
      <Route path="Create" element={<QuestionCreatePage />} />
      <Route path="*" element={<QuestionSearchPage />} />
    </Routes>
  );
}

export default QuestionRouts;
