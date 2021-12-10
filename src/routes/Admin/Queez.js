import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { CreateQuizPage, SearchQuizPage } from "../../pages";

function QuizRouts() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="Create"
        element={<CreateQuizPage navigate={() => navigate("/Quizes")} />}
      />
      <Route path="*" element={<SearchQuizPage />} />
    </Routes>
  );
}

export default QuizRouts;
