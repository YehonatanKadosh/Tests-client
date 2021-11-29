import React from "react";
import QuestionsTable from "./Questions.table";
import "./Questions.css";
import { useSelector } from "react-redux";
import { get_questions } from "../../redux/reducers/questions";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { get_tags_status, get_tags } from "../../redux/reducers/tag";
import { get_topics, get_topics_status } from "../../redux/reducers/topic";
import AppSelector from "../AppUiElements/selectors/AppSelector";
import {
  AddTagApiCall,
  AddTopicApiCall,
} from "../AppUiElements/selectors/SelectorsAddHandlers";
import { Formik } from "formik";

function QuestionSearch() {
  const questions = useSelector(get_questions);

  return (
    <Formik initialValues={{ topic: "", tag: "" }}>
      {({ values, setFieldValue }) => (
        <div className="container-fluid questions_container p-3">
          <div className="row">
            <div className="col">
              <AppSelector
                name="topic"
                valuesSelector={get_topics}
                valuesStatusSelector={get_topics_status}
                apiCall={(topic) =>
                  AddTopicApiCall(topic, (Ntopic) =>
                    setFieldValue("topic", Ntopic)
                  )
                }
              />
            </div>
            <div className="col">
              <AppSelector
                name="tag"
                valuesSelector={get_tags([values.topic])}
                valuesStatusSelector={get_tags_status}
                disabled={values.topic ? false : true}
                disabledPlaceholder="Choose Topic First"
                apiCall={(tag) =>
                  AddTagApiCall(tag, values.topic, (Ntag) =>
                    setFieldValue("tag", Ntag)
                  )
                }
              />
            </div>
          </div>
          <div className="row questions_list">
            <QuestionsTable items={questions} />
          </div>
          <div className="row">
            <Link to="Create">
              <Button sx={{ width: "100%" }}>
                <Add />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default QuestionSearch;
