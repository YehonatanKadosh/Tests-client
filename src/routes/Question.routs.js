import React from "react";
import { Route, Routes } from "react-router";
import CreateQuestion from "../components/Question/Question.create";
import QuestionSearch from "../components/Question/Question.search";

function QuestionRouts() {
  return (
    <Routes>
      <Route path="Create" element={<CreateQuestion />} />
      <Route path="*" element={<QuestionSearch />} />
    </Routes>
  );
}

export default QuestionRouts;
