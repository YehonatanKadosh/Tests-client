import React from "react";

import Copyright from "../Copyright/Copyright";
import signup from "../../API/signup";
import SignUpSchema from "./SignUp.schema";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppForm, AppFormField, SubmitButton } from "../forms";

const theme = createTheme();

export default function SignUp() {
  const signupHandler = async (user) => {
    try {
      await signup(user);
    } catch (error) {
      console.log(error);
    }
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
            validationSchema={SignUpSchema}
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
              </Grid>
            </Grid>
            <SubmitButton title="Sign Up" />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </AppForm>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
