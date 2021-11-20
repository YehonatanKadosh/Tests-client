import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const API_Call = createAction("api");

const headerName = process.env.REACT_APP_JWTHeaderName;

const API_Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== API_Call.type) return next(action);
    const { url, method, data, beforeAll, onSuccess, onError } = action.payload;
    if (beforeAll) dispatch({ type: beforeAll });
    axios
      .request({
        baseURL: process.env.REACT_APP_SERVER_URL,
        url,
        data,
        method,
        credentials: "same-origin",
        headers: sessionStorage.getItem(headerName)
          ? {
              [`${headerName}`]: sessionStorage.getItem(headerName),
            }
          : localStorage.getItem(headerName)
          ? {
              [`${headerName}`]: localStorage.getItem(headerName),
            }
          : undefined,
      })
      .then((res) => {
        const token = res.headers[headerName];
        if (token)
          if (action.payload.saveToken) localStorage.setItem(headerName, token);
          else sessionStorage.setItem(headerName, token);
        if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
      })
      .catch((reason) => {
        if (onError)
          dispatch({ type: onError, payload: reason.response?.data });
      });
  };

export default API_Middleware;
