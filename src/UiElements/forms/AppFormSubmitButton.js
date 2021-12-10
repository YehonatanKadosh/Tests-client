import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormSubmitButton({ title, className }) {
  const { handleSubmit, isValid } = useFormikContext();

  return (
    <Button
      className={className}
      type="submit"
      onClick={handleSubmit}
      variant="contained"
      sx={{ mt: 3, mb: 1, alignSelf: "center" }}
      disabled={!isValid}
    >
      {title}
    </Button>
  );
}

export default AppFormSubmitButton;
