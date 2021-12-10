import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormSubmitButton({ title, className }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      className={className}
      type="submit"
      onClick={handleSubmit}
      variant="contained"
      sx={{ mt: 3, mb: 1, alignSelf: "center" }}
    >
      {title}
    </Button>
  );
}

export default AppFormSubmitButton;
