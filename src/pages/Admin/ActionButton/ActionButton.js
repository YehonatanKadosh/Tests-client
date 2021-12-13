import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./ActionButton.css";
function ActionButton({ name, icon }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => name && navigate(name)}
      className="action_button col"
      endIcon={icon}
    >
      {name}
    </Button>
  );
}

export default ActionButton;
