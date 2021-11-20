import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: {
    login_error: undefined,
    signup_error: undefined,
    loading: false,
  },
  reducers: {
    setLoginError: (state, action) => {
      state.loading = false;
      state.login_error = action.payload;
    },
    setSignupError: (state, action) => {
      state.loading = false;
      state.signup_error = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});
export const { setLoginError, setSignupError, setLoading } = slice.actions;

export default slice.reducer;
export const get_login_error = (state) => state.login.login_error;
export const get_signup_error = (state) => state.login.signup_error;
export const get_request_status = (state) => state.login.loading;
