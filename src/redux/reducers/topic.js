import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "topics",
  initialState: { items: [], status: false },
  reducers: {
    setTopics: (state, action) => {
      Object.assign(state.items, action.payload);
      state.status = false;
    },
    newTopic: (state, action) => {
      state.items.push(action.payload);
    },
    loadTopics: (state, action) => {
      state.status = true;
    },
  },
});
export const { setTopics, newTopic, loadTopics } = slice.actions;

export default slice.reducer;
export const get_topics = (state) => state.topics.items;
export const get_topics_status = (state) => state.topics.status;
