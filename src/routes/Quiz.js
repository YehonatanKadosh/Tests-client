import React from "react";
import { Route, Routes } from "react-router";
import { QuizCreatePage, QuizSearchPage } from "../pages";

function QuizRouts() {
  return (
    <Routes>
      <Route path="Create" element={<QuizCreatePage />} />
      <Route path="*" element={<QuizSearchPage />} />
    </Routes>
  );
}

export default QuizRouts;
