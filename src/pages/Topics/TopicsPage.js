import { CircularProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopics, getTopicsWithStats } from "../../redux/api";
import { get_topics, get_topics_loading } from "../../redux/reducers/topic";
import { AppTable } from "../../UiElements";

function TopicsPage() {
  const [snackBarOpen, setSnackBarOpen] = useState(undefined);
  const dispatch = useDispatch();
  const loading = useSelector(get_topics_loading);
  const topics = useSelector(get_topics);

  useEffect(() => {
    dispatch(getTopicsWithStats);
  }, [dispatch]);

  const handleTopicDeletion = (topic) => {
    if (topic.quizzes || topic.questions || topic.tags)
      setSnackBarOpen("Can't delete Topic that is being used");
    else {
      dispatch(deleteTopics(topic._id));
      setSnackBarOpen("Deleting topic");
    }
  };

  return !loading ? (
    <>
      <AppTable
        loading={loading}
        collection={topics}
        headerCells={["Name", "Account", "Tags", "Quizzes", "Questions"]}
        bodyCells={["name", "account", "tags", "quizzes", "questions"]}
        onDelete={handleTopicDeletion}
      />
      <Snackbar
        open={snackBarOpen ? true : false}
        autoHideDuration={3000}
        onClose={() => setSnackBarOpen(undefined)}
        message={snackBarOpen}
      />
    </>
  ) : (
    <CircularProgress />
  );
}

export default TopicsPage;
