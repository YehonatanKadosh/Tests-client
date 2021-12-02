import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormSubmitButton({ title, className }) {
  const { handleSubmit, dirty, isValid, isSubmitting } = useFormikContext();

  return (
    <Button
      className={className}
      type="submit"
      onClick={handleSubmit}
      variant="contained"
      sx={{ mt: 3, mb: 2, alignSelf: "center" }}
      disabled={!(dirty && isValid) && isSubmitting}
    >
      {title}
    </Button>
  );
}

export default AppFormSubmitButton;
