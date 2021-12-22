import React from "react";
import { Box, FormHelperText, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import {
  AppFormError,
  AppFormField,
  AppFormSubmitButton,
} from "../../UiElements";
import { recovery_validator } from "quizy-yk-common";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../../redux/api/passwordRecovery";
import {
  get_recovery_error,
  get_recovery_sent,
} from "../../redux/reducers/recovery";

function PasswordRecovery() {
  const dispatch = useDispatch();
  const error = useSelector(get_recovery_error);
  const sent = useSelector(get_recovery_sent);

  const submitRecovery = ({ email }) => {
    dispatch(recoverPassword(email));
  };

  return (
    <Box className="center" sx={{ textAlign: "center" }}>
      {!sent ? (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={submitRecovery}
          validationSchema={recovery_validator}
        >
          <>
            <AppFormField
              margin="normal"
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              label="Email Address"
            />
            <AppFormError name="email" />
            <FormHelperText error={true}>{error}</FormHelperText>
            <AppFormSubmitButton className="w-100" title="recover password" />
          </>
        </Formik>
      ) : (
        <>
          <Typography variant="h6" component="div">
            Recovery link sent to your email
          </Typography>
          <Link to="/Login">Back to login</Link>
        </>
      )}
    </Box>
  );
}

export default PasswordRecovery;
