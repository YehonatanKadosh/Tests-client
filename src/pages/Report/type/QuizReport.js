import { Formik } from "formik";
import React from "react";
import "../Report.css";

function QuizReport() {
  return <Formik initialValues={{ topic: "", quiz: "" }}></Formik>;
}

export default QuizReport;
