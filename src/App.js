import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { roles } from "quizy-yk-common";
import { get_user_logged, get_user_role } from "./redux/reducers/user";
import { AdminRouts, LoginRouts, UserRouts } from "./routes";
import { tryLogin } from "./redux/api";

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(get_user_logged);
  const role = useSelector(get_user_role);

  useEffect(() => {
    const JWT_Name = process.env.REACT_APP_JWTHeaderName;
    if (localStorage.getItem(JWT_Name) || sessionStorage.getItem(JWT_Name))
      dispatch(tryLogin);
  }, [dispatch]);

  return !logged ? (
    <LoginRouts />
  ) : role === roles.Admin ? (
    <AdminRouts />
  ) : (
    <UserRouts />
  );
}

export default App;
