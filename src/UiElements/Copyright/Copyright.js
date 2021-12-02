import { Link, Typography } from "@mui/material";
import React from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* // href="https://yehonatankadosh.com/" Yehonatan Kadosh LTD */}
      <Link color="inherit"> </Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
