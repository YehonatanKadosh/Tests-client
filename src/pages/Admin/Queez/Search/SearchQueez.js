import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTopic, deleteQueez, getQueezByTopic } from "../../../../redux/api";
import {
  get_queezs,
  get_queezs_loading,
  wipeAllQueezs,
} from "../../../../redux/reducers/queezs";
import {
  get_topics,
  get_topics_loading,
} from "../../../../redux/reducers/topic";
import { AppSelector, AppTable } from "../../../../UiElements";
import CreateQueez from "../Create/CreateQueez";

function SearchQueez() {
  const dispatch = useDispatch();
  return (
    <Formik initialValues={{ topic: "", queez: [] }}>
      {({ setFieldValue, values }) => (
        <div className="container-fluid questions_container p-3">
          <div className="row">
            <AppSelector
              name="topic"
              valuesSelector={get_topics}
              valuesStatusSelector={get_topics_loading}
              apiCall={(topic) =>
                addTopic(topic, (Ntopic) => setFieldValue("topic", Ntopic))
              }
              onChange={(topic) => dispatch(getQueezByTopic(topic))}
              onEmpty={() => dispatch(wipeAllQueezs())}
            />
          </div>

          <div className="row questions_list">
            <AppTable
              loadingSelector={get_queezs_loading}
              collectionSelector={get_queezs}
              // onShow={(Q) => <QuestionShow forShow {...Q} />}
              onEdit={(Q) => <CreateQueez Q={Q} />}
              onUpdate={(Q) => <CreateQueez update Q={Q} />}
              onDelete={(Q) => dispatch(deleteQueez(Q._id))}
              name="queezes"
              headerCells={["Name", "Topic", "Language", "Version"]}
              bodyCells={["name", (q) => q.topic.name, "language", "version"]}
            />
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

export default SearchQueez;
