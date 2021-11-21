import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import "./App.css";
import { API_Call } from "../../redux/middlewares/api";
import { setLoading } from "../../redux/reducers/signInUp";
import {
  get_user_logged,
  get_user_role,
  setUser,
} from "../../redux/reducers/user";
import { roles } from "../../enums";
import UserMainPage from "../UserMainPage/UserMainPage";
import LoginRouts from "../../routes/Login.routs";
import AdminMainPage from "../AdminMainPage/AdminMainPage";

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(get_user_logged);
  const role = useSelector(get_user_role);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_JWTHeaderName))
      dispatch(
        API_Call({
          url: "login",
          method: "get",
          beforeAll: setLoading,
          onSuccess: setUser,
        })
      );
  }, [dispatch]);

  return !logged ? (
    <LoginRouts />
  ) : role === roles.Admin ? (
    <AdminMainPage /> // AdminRouts
  ) : (
    <UserMainPage /> // UserRouts
  );
}

export default App;
