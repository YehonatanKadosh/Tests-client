import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tags",
  initialState: { items: [], status: false },
  reducers: {
    setTags: (state, action) => {
      Object.assign(state.items, action.payload);
      state.status = false;
    },
    newTag: (state, action) => {
      state.items.push(action.payload);
    },
    loadTags: (state, action) => {
      state.status = true;
    },
  },
});
export const { setTags, newTag, loadTags } = slice.actions;

export default slice.reducer;
export const get_tags = (topic) => (state) =>
  topic ? state.tags.items.filter((tag) => tag.topic === topic) : [];
export const get_tags_status = (state) => state.tags.status;
