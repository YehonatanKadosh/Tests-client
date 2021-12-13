import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentRecords, getStudents } from "../../../redux/api";

import { Formik } from "formik";
import "../Report.css";
import { AppSelector, AppTable } from "../../../UiElements";
import {
  get_students,
  get_students_loading,
  get_students_records,
  wipeAllStudents,
} from "../../../redux/reducers/students";
import { QuizShowPage } from "../..";
import { setQuizByRecord } from "../../../redux/reducers/quiz";
import { setQuizRecord } from "../../../redux/reducers/quizRecord";
import { Typography } from "@mui/material";

function StudentReport() {
  const dispatch = useDispatch();
  const records = useSelector(get_students_records);
  const loading = useSelector(get_students_loading);

  useEffect(() => {
    dispatch(getStudents);
    return () => {
      dispatch(wipeAllStudents());
    };
  }, [dispatch]);

  const RecordSelected = (record) => {
    if (record) {
      dispatch(setQuizByRecord(record));
      dispatch(setQuizRecord(record));
      return <QuizShowPage forShow />;
    } else return record;
  };

  const getAverage = () => {
    const scores = records.map((record) => record.finalScore);
    let avg = 0;
    for (let i = 0; i < scores.length; i++) avg += scores[i];
    return avg / scores.length;
  };

  return (
    <Formik initialValues={{ student: "" }}>
      {({ values }) => (
        <div className="report-container">
          <AppSelector
            valuesSelector={get_students}
            name="student"
            valuesStatusSelector={get_students_loading}
            howToDisplay={(student) =>
              `${student.firstName} ${student.lastName}`
            }
            onChange={(student) => dispatch(getStudentRecords(student._id))}
          />
          <div className="student-details-container">
            {values.student && (
              <Typography>Email: {values.student.email}</Typography>
            )}
            {records.length ? (
              <Typography>Average Grade: {getAverage()}</Typography>
            ) : (
              ""
            )}
          </div>
          {records.length ? (
            <AppTable
              loading={loading}
              collection={records}
              headerCells={["Quiz", "Score", "Questions Answered"]}
              bodyCells={[
                (record) => record.quiz.name,
                "finalScore",
                "questionsAnswered",
              ]}
              collapsable
              collapsedContent={RecordSelected}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </Formik>
  );
}

export default StudentReport;
