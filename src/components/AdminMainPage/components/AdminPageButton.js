import { Button } from "@mui/material";
import React from "react";

function AdminPageButton({ value, icon }) {
  return (
    <Button
      variant="contained"
      className="admin_page_button col"
      endIcon={icon}
    >
      {value}
    </Button>
  );
}

export default AdminPageButton;
