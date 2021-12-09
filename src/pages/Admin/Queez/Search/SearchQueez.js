import { Add, ContentCopy } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CreateQueezPage } from "../../..";
import { addTopic, deleteQueez, getQueezByTopic } from "../../../../redux/api";
import { setQueez } from "../../../../redux/reducers/queez";
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
import ShowQueez from "../Show/ShowQueez";
import { CopyToClipboard } from "react-copy-to-clipboard";

function SearchQueez() {
  const dispatch = useDispatch();
  const queezes = useSelector(get_queezs);
  const queezesLoading = useSelector(get_queezs_loading);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  return (
    <Formik initialValues={{ topic: "" }}>
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

          {queezes.length ? (
            <>
              <div className="row questions_list">
                <AppTable
                  collection={queezes}
                  loading={queezesLoading}
                  onShow={(Q) => {
                    dispatch(setQueez(Q));
                    return <ShowQueez forShow />;
                  }}
                  onEdit={(Q) => <CreateQueezPage Q={Q} />}
                  onUpdate={(Q) => <CreateQueezPage update Q={Q} />}
                  onDelete={(Q) => dispatch(deleteQueez(Q._id))}
                  headerCells={["Name", "Topic", "Language", "Link"]}
                  bodyCells={[
                    "name",
                    (q) => q.topic.name,
                    "language",
                    (q) => (
                      <CopyToClipboard
                        onCopy={() =>
                          setSnackBarOpen(`'${q.name}' link copied`)
                        }
                        text={`${process.env.REACT_APP_Client_Address}/${q._id}`}
                      >
                        <IconButton>
                          <ContentCopy />
                        </IconButton>
                      </CopyToClipboard>
                    ),
                  ]}
                />
              </div>

              <Snackbar
                open={snackBarOpen ? true : false}
                autoHideDuration={3000}
                onClose={() => setSnackBarOpen(undefined)}
                message={snackBarOpen}
              />
            </>
          ) : (
            <div className="row questions_list"></div>
          )}

          <div className="row">
            <Link to="Create">
              <Button variant="contained" sx={{ width: "100%" }}>
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
