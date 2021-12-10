import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { get_queez } from "../../../../redux/reducers/queez";

function IntroductionPage() {
  const { introduction } = useSelector(get_queez);
  return introduction ? (
    <Typography>{introduction}</Typography>
  ) : (
    "No introduction"
  );
}

export default IntroductionPage;
