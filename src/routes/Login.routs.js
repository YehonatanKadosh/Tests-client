import React from "react";
import { Route, Routes } from "react-router";
import Login from "../components/Login/Login";
import PasswordRecovery from "../components/PasswordRecovery/PasswordRecovery";
import SignUp from "../components/SignUp/SignUp";

function LoginRouts() {
  return (
    <Routes>
      <Route path="Signin" element={<Login />} />
      <Route path="PasswordRecovery" element={<PasswordRecovery />} />
      <Route path="Signup" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default LoginRouts;
