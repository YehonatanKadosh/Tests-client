import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { roles } from "queezy-common";
import { get_user_logged, get_user_role } from "./redux/reducers/user";
import { AdminRouts, LoginRouts, UserRouts } from "./routes";
import { tryLogin } from "./redux/api";

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(get_user_logged);
  const role = useSelector(get_user_role);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_JWTHeaderName))
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
