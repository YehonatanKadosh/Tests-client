import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { QuizCreatePage, QuizSearchPage } from "../pages";

function QuizRouts() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="Create"
        element={<QuizCreatePage navigate={() => navigate("/Quizzes")} />}
      />
      <Route path="*" element={<QuizSearchPage />} />
    </Routes>
  );
}

export default QuizRouts;
