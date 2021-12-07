import {
  DoneAll,
  Email,
  Flag,
  PlayArrow,
  QuestionAnswer,
} from "@mui/icons-material";
import { Checkbox, Dialog } from "@mui/material";
import { Formik } from "formik";
import { queez_validator, languages } from "queezy-common";
import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { QuestionCreatePage } from "../../..";
import { createUpdateQueez } from "../../../../redux/api";
import { removeQueez } from "../../../../redux/reducers/queezs";
import {
  AppFormChoiceList,
  AppFormError,
  AppFormField,
  AppFormSubmitButton,
} from "../../../../UiElements";
import AppAccordion from "../../../../UiElements/AppAccordion";
import QuestionSearch from "../../Question/Search/QuestionSearch";

export const AccordionContext = createContext();

function CreateQueez({ Q, update, navigate }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState("Formalities");
  const [selectedQuestion, setSelectedQuestion] = useState(undefined);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const submitQueez = (queez) => {
    queez.version = update ? Q?.version + 1 : Q?.version || 1;
    dispatch(createUpdateQueez(Q, queez, update, navigate));
    if (update) dispatch(removeQueez({ _id: Q._id }));
  };

  return (
    <Formik
      initialValues={
        Q || {
          language: Object.values(languages)[0],
          name: "",
          introduction: "",
          questions: [],
          queezenerEmail: "",
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
      onSubmit={submitQueez}
      validationSchema={queez_validator}
    >
      {({ values, setFieldValue, errors }) => (
        <AccordionContext.Provider value={{ handleChange, expanded }}>
          <div className="create_question_container">
            <AppAccordion
              errors={
                <div>
                  <AppFormError name="name" />
                  <AppFormError name="passingScore" />
                  <AppFormError name="language" />
                  <AppFormError name="answersReview" />
                </div>
              }
              icon={<Flag />}
              title="Formalities"
            >
              <AppFormField
                name="name"
                label="Queez Name"
                className="w-100"
                rows={1}
              />
              <div className="row text-center my-1">
                <div className="col">
                  <AppFormField
                    name="passingScore"
                    label="Passsing Score"
                    className="w-100"
                    type="number"
                    rows={1}
                  />
                </div>
                <div className="col">
                  <AppFormChoiceList
                    title="Choose Language"
                    name="language"
                    className="col"
                    Enum={languages}
                  />
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
                </div>
              </div>
            </AppAccordion>

            <AppAccordion
              errors={<AppFormError name="introduction" />}
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
            </AppAccordion>

            <AppAccordion
              errors={
                <div>
                  <AppFormError name="topic" />
                  <AppFormError name="questions" />
                </div>
              }
              icon={<QuestionAnswer />}
              title="Questions"
            >
              <QuestionSearch
                onAdd={() => setSelectedQuestion(<QuestionCreatePage />)}
                onClick={(question) => console.log(question)}
              />
              {/* () => {
                      if (Builder) {
                        if (!values[name].includes(item)) push(item._id);
                        else remove(values[name].indexOf(item));
                      }
                    } */}
            </AppAccordion>

            <AppAccordion
              errors={
                <div>
                  <AppFormError name="successMessage" />
                  <AppFormError name="failMessage" />
                </div>
              }
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

              <AppFormField
                name="failMessage"
                label="Fail Message"
                className="w-100 mt-3"
                rows={4}
                multiline
              />
            </AppAccordion>

            <AppAccordion
              errors={
                <div>
                  <AppFormError name="queezenerEmail" />
                  <AppFormError name="successEmailSubject" />
                  <AppFormError name="successEmailMessage" />
                  <AppFormError name="failEmailSubject" />
                  <AppFormError name="failEmailMessage" />
                </div>
              }
              icon={<Email />}
              title="Email"
            >
              <AppFormField
                name="queezenerEmail"
                label="Queezener Email"
                className="w-100"
                rows={1}
                type="email"
              />
              <AppFormField
                name="successEmailSubject"
                label="Success Email Subject"
                className="w-100 mt-3"
                rows={1}
              />
              <AppFormField
                name="successEmailMessage"
                label="Success Email Message"
                className="w-100"
                rows={4}
                multiline
              />
              <AppFormField
                name="failEmailSubject"
                label="Fail Email Subject"
                className="w-100 mt-3"
                rows={1}
              />
              <AppFormField
                name="failEmailMessage"
                label="Fail Email Message"
                className="w-100"
                rows={4}
                multiline
              />
            </AppAccordion>

            <div className="row px-2">
              <AppFormSubmitButton title="Save Queez" />
            </div>
          </div>
          {selectedQuestion && (
            <Dialog
              onClose={() => setSelectedQuestion(undefined)}
              open={selectedQuestion ? true : false}
            >
              {selectedQuestion}
            </Dialog>
          )}
        </AccordionContext.Provider>
      )}
    </Formik>
  );
}
export default CreateQueez;
