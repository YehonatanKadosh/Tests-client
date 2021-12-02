import React from "react";
import { Route, Routes } from "react-router";
import { LoginPage, PasswordRecoveryPage, SignUpPage } from "../../pages";

function LoginRouts() {
  return (
    <Routes>
      <Route path="Signin" element={<LoginPage />} />
      <Route path="PasswordRecovery" element={<PasswordRecoveryPage />} />
      <Route path="Signup" element={<SignUpPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default LoginRouts;
