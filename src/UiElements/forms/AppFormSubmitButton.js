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
      sx={{ alignSelf: "center", mb: 3, mt: 2 }}
    >
      {title}
    </Button>
  );
}

export default AppFormSubmitButton;
