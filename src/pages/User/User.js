import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { tryGettingQuiz } from "../../redux/api";
import { get_quiz } from "../../redux/reducers/quiz";
import { get_request_loading } from "../../redux/reducers/request";
import { QuizCreatePage } from "..";
import "./User.css";

function User() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector(get_request_loading);
  const { _id } = useSelector(get_quiz);

  useEffect(() => {
    dispatch(tryGettingQuiz(location.pathname.substr(1)));
  }, [dispatch, location.pathname]);

  return !loading ? (
    _id ? (
      <QuizCreatePage />
    ) : (
      <Typography className="quiz-not-found">Quiz not found</Typography>
    )
  ) : (
    <CircularProgress variant="indeterminate" />
  );
}

export default User;
