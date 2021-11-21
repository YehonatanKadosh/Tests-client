import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import API_Middleware from "./middlewares/api";
import user from "./reducers/user";
import login from "./reducers/signInUp";

const appReducer = combineReducers({ user, login });

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
