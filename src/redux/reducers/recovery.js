import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "recovery",
  initialState: { loading: false, error: undefined, sent: false },
  reducers: {
    requestRecovery: (state, action) => {
      state.error = undefined;
      state.loading = true;
    },
    recoveryRequestAnswered: (state, action) => {
      state.loading = false;
      state.sent = true;
    },
    recoveryRequestError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const {
  requestRecovery,
  recoveryRequestAnswered,
  recoveryRequestError,
} = slice.actions;

export default slice.reducer;
export const get_recovery_error = (state) => state.recovery.error;
export const get_recovery_loading = (state) => state.recovery.loading;
export const get_recovery_sent = (state) => state.recovery.sent;
