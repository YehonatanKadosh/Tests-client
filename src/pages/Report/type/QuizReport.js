import { TextField, Box } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuizShowPage } from "../..";
import { addTopic, getQuizzes, getReportsWithParams } from "../../../redux/api";
import { setQuizByRecord } from "../../../redux/reducers/quiz";
import { setQuizRecord } from "../../../redux/reducers/quizRecord";
import {
  get_quizRecords,
  get_quizRecords_loading,
  wipeRecords,
} from "../../../redux/reducers/quizRecords";
import {
  get_quizzes,
  get_quizzes_loading,
  wipeAllQuizzes,
} from "../../../redux/reducers/quizzes";
import { get_topics, get_topics_loading } from "../../../redux/reducers/topic";
import { AppSelector, AppTable } from "../../../UiElements";
import "../Report.css";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { AccordionContext } from "../../Quiz/Create/CreateQuiz";
import AppAccordion from "../../../UiElements/AppAccordion";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  QuestionMark,
  Receipt,
} from "@mui/icons-material";
import { removeHeader, setHeader } from "../../../redux/reducers/header";

function QuizReport() {
  const dispatch = useDispatch();
  const quizzes = useSelector(get_quizzes);
  const records = useSelector(get_quizRecords);
  const loading = useSelector(get_quizRecords_loading);
  const [expanded, setExpanded] = useState("Records");

  useEffect(() => {
    dispatch(setHeader("Report By Quiz"));
    return () => {
      dispatch(wipeAllQuizzes());
      dispatch(wipeRecords());
      dispatch(removeHeader());
    };
  }, [dispatch]);

  const RecordSelected = (record) => {
    if (record) {
      dispatch(setQuizByRecord(record));
      dispatch(setQuizRecord(record));
      return <QuizShowPage forShow />;
    } else return record;
  };

  const AccordionChange = (panel) => (event, newExpanded) =>
    setExpanded(newExpanded ? panel : false);

  const QuestionsSelected = (question) => {
    return (
      <AppTable
        collection={question?.answers || []}
        headerCells={["Content", "Correct", "Answered Precentage"]}
        bodyCells={[
          "content",
          (q) => (q.isRight ? <CheckBox /> : <CheckBoxOutlineBlank />),
          (a) => `${a.answeredPrecentage}%`,
        ]}
      />
    );
  };

  // best logic ever
  const getQuestionsStats = (questions) => {
    const Questions = [];
    const answersInRecord = records.map((r) => r.answers);
    for (let i = 0; i < questions.length; i++) {
      let answered = false;
      let answeredTimes = 0;
      let answeredCorrectly = true;
      let answeredCorrectlyTimes = 0;
      const savedAnswers = questions[i].answers.map((a) => {
        return { ...a, answeredPrecentage: 0 };
      });
      for (let recordI = 0; recordI < answersInRecord.length; recordI++) {
        const answersForQuestion = answersInRecord[0].find(
          (answer) => answer.question === questions[i]._id
        );
        for (let answersI = 0; answersI < savedAnswers.length; answersI++) {
          const savedAnswer = savedAnswers[answersI];
          const answeredAnswer = answersForQuestion.answers.find(
            (a) => a === savedAnswer._id
          );
          if (answeredAnswer) {
            answered = true;
            savedAnswer.answeredPrecentage += 100 / records.length;
            if (!savedAnswer.isRight) answeredCorrectly = false;
          } else if (savedAnswer.isRight) answeredCorrectly = false;
        }
        if (answered) answeredTimes += 1;
        if (answeredCorrectly) answeredCorrectlyTimes += 1;
      }
      Questions.push({
        ...questions[i],
        answered: answeredTimes,
        answeredCorrectly: (answeredCorrectlyTimes / records.length) * 100,
        answers: savedAnswers,
      });
    }
    return Questions;
  };

  return (
    <Formik
      initialValues={{
        topic: "",
        quiz: "",
        range: [null, null],
      }}
    >
      {({ values, setFieldValue }) => (
        <>
          <div className="row px-2">
            <div className="col">
              <AppSelector
                name="topic"
                valuesSelector={get_topics}
                valuesStatusSelector={get_topics_loading}
                apiCall={(topic) =>
                  addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
                }
                onChange={(topic) => {
                  setFieldValue("quiz", "");
                  setFieldValue("range", [null, null]);
                  dispatch(getQuizzes({ topic }));
                }}
                onEmpty={() => {
                  setFieldValue("range", [null, null]);
                  setFieldValue("quiz", "");
                  dispatch(wipeAllQuizzes());
                }}
              />
            </div>
            {quizzes?.length ? (
              <>
                <div className="col">
                  <AppSelector
                    name="quiz"
                    valuesSelector={get_quizzes}
                    valuesStatusSelector={get_quizzes_loading}
                    onChange={(quiz) => {
                      dispatch(wipeRecords());
                      dispatch(getReportsWithParams(quiz._id));
                    }}
                    onEmpty={() => dispatch(wipeRecords())}
                  />
                </div>
                <div className="col mt-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="From"
                      endText="To"
                      value={values.range}
                      onChange={(dateRange) => {
                        setFieldValue("range", dateRange);
                        dispatch(wipeRecords());
                        if (dateRange[0] !== null && dateRange[1] !== null) {
                          dispatch(
                            getReportsWithParams(values.quiz._id, dateRange)
                          );
                        }
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {records?.length ? (
            <AccordionContext.Provider
              value={{ handleChange: AccordionChange, expanded }}
            >
              <AppAccordion sx={{ mt: 1 }} icon={<Receipt />} title="Records">
                <AppTable
                  loading={loading}
                  collection={records}
                  headerCells={[
                    "Student",
                    "Date",
                    "Score",
                    "Questions Answered",
                  ]}
                  bodyCells={[
                    (record) =>
                      `${record.user.firstName} ${record.user.lastName}`,
                    "date",
                    "finalScore",
                    "questionsAnswered",
                  ]}
                  collapsable
                  collapsedContent={RecordSelected}
                />
              </AppAccordion>
              <AppAccordion icon={<QuestionMark />} title="Questions">
                <AppTable
                  collection={getQuestionsStats(values.quiz.questions)}
                  headerCells={["Question", "Answered", "Answered Correctly"]}
                  bodyCells={[
                    "question",
                    "answered",
                    (q) => `${q.answeredCorrectly}%`,
                  ]}
                  collapsable
                  collapsedContent={QuestionsSelected}
                />
              </AppAccordion>
            </AccordionContext.Provider>
          ) : (
            ""
          )}
        </>
      )}
    </Formik>
  );
}

export default QuizReport;
