import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { get_quiz } from "../../../redux/reducers/quiz";

function IntroductionPage() {
  const { introduction } = useSelector(get_quiz);
  return introduction ? (
    <Typography>{introduction}</Typography>
  ) : (
    "No introduction"
  );
}

export default IntroductionPage;
