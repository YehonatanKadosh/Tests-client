import { Formik } from "formik";
import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import { QuestionCreatePage, QuestionSearchPage } from "../pages";

function QuestionRouts() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="Create"
        element={<QuestionCreatePage navigate={() => navigate("/Questions")} />}
      />
      <Route
        path="*"
        element={
          <Formik initialValues={{ topic: "", tag: "" }}>
            <QuestionSearchPage />
          </Formik>
        }
      />
    </Routes>
  );
}

export default QuestionRouts;
