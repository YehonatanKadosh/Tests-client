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
    removeTopic: (state, action) => {
      const removedT = state.items.find((t) => t._id === action.payload._id);
      if (removedT) state.items.splice(state.items.indexOf(removedT), 1);
    },
  },
});
export const { setTopics, newTopic, loadTopics, removeTopic } = slice.actions;

export default slice.reducer;
export const get_topics = (state) => state.topics.items;
export const get_topics_loading = (state) => state.topics.loading;
export const getTopicById = (id) => (state) =>
  state.topics.items.find((t) => t._id === id);
