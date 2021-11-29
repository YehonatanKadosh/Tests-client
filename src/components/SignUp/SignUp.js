import React from "react";

import Copyright from "../AppUiElements/Copyright/Copyright";
import { signup_validator } from "queezy-common";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppForm,
  AppFormError,
  AppFormField,
  SubmitButton,
} from "../AppUiElements/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  get_signup_error,
  setLoading,
  setSignupError,
} from "../../redux/reducers/signInUp";
import { API_Call } from "../../redux/middlewares/api";
import { setUser } from "../../redux/reducers/user";
import { FormHelperText } from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const error = useSelector(get_signup_error);

  const signupHandler = async (data) => {
    dispatch(setSignupError(undefined));
    dispatch(
      API_Call({
        url: "signup",
        method: "post",
        data,
        beforeAll: setLoading,
        onSuccess: setUser,
        onError: setSignupError,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ mb: 3 }} component="h1" variant="h5">
            Sign up
          </Typography>

          <AppForm
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              phoneNumber: "",
            }}
            validationSchema={signup_validator}
            onSubmit={signupHandler}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <AppFormField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
                <AppFormError name="firstName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppFormField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
                <AppFormError name="lastName" />
              </Grid>
              <Grid item xs={12}>
                <AppFormField
                  autoComplete="phone"
                  name="phoneNumber"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                />
                <AppFormError name="phoneNumber" />
              </Grid>
              <Grid item xs={12}>
                <AppFormField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <AppFormError name="email" />
              </Grid>
              <Grid item xs={12}>
                <AppFormField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <AppFormError name="password" />
              </Grid>
            </Grid>

            {error && <FormHelperText error={true}>{error}</FormHelperText>}

            <SubmitButton title="Sign Up" />
          </AppForm>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="Signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
