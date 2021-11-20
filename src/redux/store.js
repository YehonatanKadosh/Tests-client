import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import API_Middleware from "./middlewares/api";
import user from "./reducers/user";
import login from "./reducers/signInUp";

const appReducer = combineReducers({ user, login });

const rootReducer = (state, action) => {
  if (action.type === "log-out") state = undefined;
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: [API_Middleware],
});
