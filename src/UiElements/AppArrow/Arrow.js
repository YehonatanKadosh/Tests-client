import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import "./Arrow.css";

function Arrow({ direction, clickFunction }) {
  return (
    <IconButton
      className={
        "arrow" + (direction === "left" ? " arrow-left" : " arrow-right")
      }
      onClick={clickFunction}
    >
      {direction === "left" ? (
        <ArrowLeft fontSize="large" />
      ) : (
        <ArrowRight fontSize="large" />
      )}
    </IconButton>
  );
}

export default Arrow;
