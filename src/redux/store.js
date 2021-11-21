import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import API_Middleware from "./middlewares/api";
import user from "./reducers/user";
import login from "./reducers/signInUp";
import actions from "./reducers/actions";
import questions from "./reducers/questions";

const appReducer = combineReducers({ user, login, actions, questions });

const rootReducer = (state, action) => {
  if (action.type === "log-out") {
    state = undefined;
    const tokenName = process.env.REACT_APP_JWTHeaderName;
    if (sessionStorage.getItem(tokenName)) sessionStorage.removeItem(tokenName);
    if (localStorage.getItem(tokenName)) localStorage.removeItem(tokenName);
  }
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: [API_Middleware],
});
