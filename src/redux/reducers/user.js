import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    firstName: undefined,
    lastName: undefined,
    role: undefined,
    logged: false,
  },
  reducers: {
    setUser: (state, action) => {
      Object.assign(state, { ...action.payload, logged: true });
    },
  },
});
export const { setUser } = slice.actions;

export default slice.reducer;
export const get_user_name = (state) =>
  `${state.user.firstName} ${state.user.lastName}`;
export const get_user_role = (state) => state.user.role;
export const get_user = (state) => state.user;
export const get_user_logged = (state) => state.user.logged;
