import { Button } from "@mui/material";
import React from "react";
import "./ActionButton.css";
import { useNavigate } from "react-router-dom";
function ActionButton({ name, icon, rout }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => rout && navigate(rout)}
      className="action_button col"
      endIcon={icon}
    >
      {name}
    </Button>
  );
}

export default ActionButton;