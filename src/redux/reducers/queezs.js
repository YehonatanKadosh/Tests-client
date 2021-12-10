import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "queezs",
  initialState: { items: [], loading: false },
  reducers: {
    setNewQueez: (state, action) => {
      state.items.push(action.payload);
    },
    setQueezs: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    updateQueez: (state, action) => {
      let Queez = state.items.find((q) => q._id === action.payload._id);
      if (Queez) Object.assign(Queez, action.payload);
    },
    loadQueezs: (state, action) => {
      state.loading = true;
    },
    removeQueez: (state, action) => {
      const removedQ = state.items.find((q) => q._id === action.payload._id);
      if (removedQ) state.items.splice(state.items.indexOf(removedQ), 1);
    },
    wipeAllQueezs: (state, action) => {
      state.items = [];
    },
  },
});
export const {
  updateQueez,
  setNewQueez,
  setQueezs,
  loadQueezs,
  removeQueez,
  wipeAllQueezs,
} = slice.actions;

export default slice.reducer;
export const get_queezs = (state) => state.queezs.items;
export const get_queezs_loading = (state) => state.queezs.loading;
export const get_queez_by_id = (id) => (state) =>
  state.queezs.items.filter((q) => q._id === id);
