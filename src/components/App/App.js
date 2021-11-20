import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Login/Login";
import "./App.css";
import SignUp from "../SignUp/SignUp";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
import { API_Call } from "../../redux/middlewares/api";
import { setLoading } from "../../redux/reducers/signInUp";
import { setUser } from "../../redux/reducers/user";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      API_Call({
        url: "login",
        method: "get",
        beforeAll: setLoading,
        onSuccess: setUser,
      })
    );
  }, [dispatch]);

  return (
    <Routes>
      <Route path="Signin" element={<Login />} />
      <Route path="PasswordRecovery" element={<PasswordRecovery />} />
      <Route path="Signup" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
