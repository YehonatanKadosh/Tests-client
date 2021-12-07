import React from "react";
import { Link } from "react-router-dom";
import { login_validator } from "queezy-common";
import { useDispatch, useSelector } from "react-redux";

import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
  AppFormCheckbox,
  AppFormError,
  Copyright,
} from "../../UiElements";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress, FormHelperText } from "@mui/material";
import { login } from "../../redux/api";
import { get_login_error, setLoginError } from "../../redux/reducers/signInUp";
import { get_request_loading } from "../../redux/reducers/request";

export default function Login(props) {
  const dispatch = useDispatch();
  const error = useSelector(get_login_error);
  const loading = useSelector(get_request_loading);

  const loginHandler = async (data) => {
    if (error) dispatch(setLoginError(undefined));
    dispatch(login(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!loading ? (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <AppForm
              initialValues={{
                email: "",
                password: "",
                rememberMe: true,
              }}
              validationSchema={login_validator}
              onSubmit={loginHandler}
            >
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

              <AppFormField
                margin="normal"
                autoComplete="current-password"
                name="password"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
              />
              <AppFormError name="password" />

              <AppFormCheckbox label="Remember me" name="rememberMe" />
              <AppFormError name="rememberMe" />

              {error && <FormHelperText error={true}>{error}</FormHelperText>}

              <AppFormSubmitButton title="Sign In" />
            </AppForm>

            <Grid container>
              <Grid item xs>
                <Link to="/PasswordRecovery">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/Signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
}
