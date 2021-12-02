import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tags",
  initialState: { items: [], status: false },
  reducers: {
    setTags: (state, action) => {
      state.items = action.payload;
      state.status = false;
    },
    newTag: (state, action) => {
      state.items.push(action.payload);
    },
    loadTags: (state, action) => {
      state.status = true;
    },
    wipeAllTags: (state, action) => {
      state.items = [];
    },
  },
});
export const { setTags, newTag, loadTags, wipeAllTags } = slice.actions;

export default slice.reducer;
export const get_all_tags = (state) => state.tags.items;
export const get_tags_status = (state) => state.tags.status;
