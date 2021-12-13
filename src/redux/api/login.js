import { setLogin, setLoginError, setSignupError } from "../reducers/signInUp";
import { setUser } from "../reducers/user";
import { API_Call } from "./middleware";

export const login = ({ email, password, rememberMe }) =>
  API_Call({
    url: "login",
    method: "post",
    data: { email, password },
    beforeAll: setLogin,
    onSuccess: setUser,
    onError: setLoginError,
    saveToken: rememberMe,
  });

export const signUp = (data) =>
  API_Call({
    url: "signup",
    method: "post",
    data,
    beforeAll: setLogin,
    onSuccess: setUser,
    onError: setSignupError,
  });

export const tryLogin = API_Call({
  url: "login",
  method: "get",
  beforeAll: setLogin,
  onSuccess: setUser,
});
