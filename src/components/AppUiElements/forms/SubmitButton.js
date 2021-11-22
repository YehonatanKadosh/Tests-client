import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function SubmitButton({ title }) {
  const { handleSubmit, dirty, isValid, isSubmitting } = useFormikContext();

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={!(dirty && isValid) && isSubmitting}
    >
      {title}
    </Button>
  );
}

export default SubmitButton;
