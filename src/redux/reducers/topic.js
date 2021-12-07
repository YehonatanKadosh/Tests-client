import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "topics",
  initialState: { items: [], loading: false },
  reducers: {
    setTopics: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    newTopic: (state, action) => {
      state.items.push(action.payload);
    },
    loadTopics: (state, action) => {
      state.loading = true;
    },
  },
});
export const { setTopics, newTopic, loadTopics } = slice.actions;

export default slice.reducer;
export const get_topics = (state) => state.topics.items;
export const get_topics_loading = (state) => state.topics.loading;
export const getTopicById = (id) => (state) =>
  state.topics.items.find((t) => t._id === id);
