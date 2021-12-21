import { Formik } from "formik";
import React from "react";
import { Route, Routes } from "react-router";
import { QuestionCreatePage, QuestionSearchPage } from "../pages";

function QuestionRouts() {
  return (
    <Routes>
      <Route path="Create" element={<QuestionCreatePage />} />
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
