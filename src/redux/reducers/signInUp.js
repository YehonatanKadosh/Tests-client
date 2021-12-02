import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "signInUp",
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
    setLogin: (state) => {
      state.loading = true;
    },
  },
});
export const { setLoginError, setSignupError, setLogin } = slice.actions;

export default slice.reducer;
export const get_login_error = (state) => state.signInUp.login_error;
export const get_signup_error = (state) => state.signInUp.signup_error;
export const get_login_status = (state) => state.signInUp.loading;
