import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tags",
  initialState: { items: [], loading: false },
  reducers: {
    setTags: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    newTag: (state, action) => {
      state.items.push(action.payload);
    },
    loadTags: (state, action) => {
      state.loading = true;
    },
    wipeAllTags: (state, action) => {
      state.items = [];
    },
  },
});
export const { setTags, newTag, loadTags, wipeAllTags } = slice.actions;

export default slice.reducer;
export const get_all_tags = (state) => state.tags.items;
export const get_tags_loading = (state) => state.tags.loading;
