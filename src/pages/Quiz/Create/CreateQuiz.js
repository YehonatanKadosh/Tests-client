import {
  DoneAll,
  Email,
  Flag,
  PlayArrow,
  QuestionAnswer,
} from "@mui/icons-material";
import { Button, Checkbox, Dialog } from "@mui/material";
import { FieldArray, Formik } from "formik";
import { quiz_validator, languages } from "quizy-yk-common";
import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {
  QuestionCreatePage,
  QuestionShowPage,
  QuestionSearchPage,
  QuizCreatePage,
} from "../..";
import { createUpdateQuiz } from "../../../redux/api";
import { setQuiz } from "../../../redux/reducers/quiz";
import { removeQuiz } from "../../../redux/reducers/quizzes";
import {
  AppFormChoiceList,
  AppFormError,
  AppFormField,
  AppFormSubmitButton,
  AppTable,
} from "../../../UiElements";
import AppAccordion from "../../../UiElements/AppAccordion";
import { useNavigate } from "react-router-dom";

export const AccordionContext = createContext();

function CreateQuiz({ Q, update, onSave }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState("Formalities");
  const [dialogContent, setDialogContent] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitQuiz = (quiz) => {
    dispatch(
      createUpdateQuiz(
        Q,
        { ...quiz, version: update ? Q?.version + 1 : Q?.version || 1 },
        update,
        onSave ? onSave : () => navigate("Quizzes")
      )
    );
    if (update) dispatch(removeQuiz({ _id: Q._id }));
  };

  return (
    <Formik
      initialValues={
        Q || {
          language: Object.values(languages)[0],
          name: "",
          introduction: "",
          questions: [],
          quizenerEmail: "",
          passingScore: 0,
          answersReview: true,
          topic: "",
          successMessage: "",
          failMessage: "",
          successEmailSubject: "",
          successEmailMessage: "",
          failEmailSubject: "",
          failEmailMessage: "",
          certificateURL: location.pathname + "/certificate",
          version: 1,
        }
      }
      onSubmit={submitQuiz}
      validationSchema={quiz_validator}
    >
      {({ values, setFieldValue, errors }) => (
        <AccordionContext.Provider value={{ handleChange, expanded }}>
          <div className="create_question_container">
            <AppAccordion
              errors={
                errors.name ||
                errors.passingScore ||
                errors.answersReview ||
                errors.language
              }
              icon={<Flag />}
              title="Formalities"
            >
              <AppFormField
                name="name"
                label="Quiz Name"
                className="w-100"
                rows={1}
              />
              <AppFormError name="name" />
              <div className="row text-center my-1">
                <div className="col">
                  <AppFormField
                    name="passingScore"
                    label="Passsing Score"
                    className="w-100"
                    type="number"
                    rows={1}
                  />
                  <AppFormError name="passingScore" />
                </div>

                <div className="col">
                  <AppFormChoiceList
                    title="Choose Language"
                    name="language"
                    className="col"
                    Enum={languages}
                  />
                  <AppFormError name="language" />
                </div>

                <div className="col">
                  {!values.answersReview && "Dont"} Show Correct Answers After
                  Submission
                  <Checkbox
                    checked={values.answersReview}
                    onChange={() =>
                      setFieldValue("answersReview", !values.answersReview)
                    }
                  />
                  <AppFormError name="answersReview" />
                </div>
              </div>
            </AppAccordion>
            <AppAccordion
              errors={errors.introduction}
              icon={<PlayArrow />}
              title="Introduction"
            >
              <AppFormField
                name="introduction"
                label="Introduction"
                className="w-100"
                rows={4}
                multiline
              />
              <AppFormError name="introduction" />
            </AppAccordion>
            <AppAccordion
              errors={errors.topic || errors.questions}
              icon={<QuestionAnswer />}
              title="Questions"
            >
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    <QuestionSearchPage
                      onAdd={() =>
                        setDialogContent(
                          <QuestionCreatePage
                            onSave={() => setDialogContent(undefined)}
                          />
                        )
                      }
                      onSelected={(question) => {
                        const Q = values.questions.find(
                          (q) => q._id === question._id
                        );
                        if (!Q) push(question);
                      }}
                    />
                    {values.questions.length ? (
                      <>
                        <h6>Selected Questions</h6>
                        <AppTable
                          collection={values.questions}
                          onShow={(Q) => <QuestionShowPage forShow {...Q} />}
                          onEdit={(Q, onSave) => (
                            <QuestionCreatePage onSave={onSave} Q={Q} />
                          )}
                          onUpdate={(Q, onSave) => (
                            <QuestionCreatePage onSave={onSave} update Q={Q} />
                          )}
                          onDelete={(question) => {
                            const Q = values.questions.find(
                              (q) => q._id === question._id
                            );
                            if (Q) remove(values.questions.indexOf(Q));
                          }}
                          selections
                          headerCells={[
                            "Question",
                            "Topics",
                            "Tags",
                            "Last Update",
                            "Version",
                          ]}
                          bodyCells={[
                            "question",
                            (q) =>
                              q.topics.map((t) => (
                                <div key={t._id}>{t.name}</div>
                              )),
                            (q) =>
                              q.tags.map((t) => (
                                <div key={t._id}>{t.name}</div>
                              )),
                            "lastUpdated",
                            "version",
                          ]}
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <AppFormError name="questions" />
                  </>
                )}
              </FieldArray>
            </AppAccordion>
            <AppAccordion
              errors={errors.successMessage || errors.failMessage}
              icon={<DoneAll />}
              title="Summary"
            >
              <AppFormField
                name="successMessage"
                label="Success Message"
                className="w-100"
                rows={4}
                multiline
              />
              <AppFormError name="successMessage" />

              <AppFormField
                name="failMessage"
                label="Fail Message"
                className="w-100 mt-3"
                rows={4}
                multiline
              />
              <AppFormError name="failMessage" />
            </AppAccordion>
            <AppAccordion
              errors={
                errors.quizenerEmail ||
                errors.successEmailSubject ||
                errors.successEmailMessage ||
                errors.failEmailSubject ||
                errors.failEmailMessage
              }
              icon={<Email />}
              title="Email"
            >
              <AppFormField
                name="quizenerEmail"
                label="quizener Email"
                className="w-100"
                rows={1}
                type="email"
              />
              <AppFormError name="quizenerEmail" />

              <AppFormField
                name="successEmailSubject"
                label="Success Email Subject"
                className="w-100 mt-3"
                rows={1}
              />
              <AppFormError name="successEmailSubject" />

              <AppFormField
                name="successEmailMessage"
                label="Success Email Message"
                className="w-100"
                rows={4}
                multiline
              />
              <AppFormError name="successEmailMessage" />

              <AppFormField
                name="failEmailSubject"
                label="Fail Email Subject"
                className="w-100 mt-3"
                rows={1}
              />
              <AppFormError name="failEmailSubject" />

              <AppFormField
                name="failEmailMessage"
                label="Fail Email Message"
                className="w-100"
                rows={4}
                multiline
              />
              <AppFormError name="failEmailMessage" />
            </AppAccordion>
            <div className="row">
              <Button
                onClick={() => {
                  dispatch(setQuiz(values));
                  setDialogContent(<QuizCreatePage forShow />);
                }}
                sx={{ mt: 3 }}
              >
                Preview
              </Button>
              <AppFormSubmitButton title="Save Quiz" />
            </div>
          </div>

          {dialogContent && (
            <Dialog
              onClose={() => setDialogContent(undefined)}
              open={dialogContent ? true : false}
            >
              {dialogContent}
            </Dialog>
          )}
        </AccordionContext.Provider>
      )}
    </Formik>
  );
}
export default CreateQuiz;
