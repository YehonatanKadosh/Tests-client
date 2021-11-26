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
export const get_tags = (topics) => (state) => {
  if (topics) {
    const topicIds = topics.map((t) => t._id);
    const filteredTags = [];

    topicIds.forEach((topicId) => {
      const filtered = state.tags.items.filter((tag) =>
        tag.topics?.includes(topicId)
      );
      filtered.forEach((filteredTag) => {
        if (!filteredTags.includes(filteredTag)) filteredTags.push(filteredTag);
      });
    });
    return filteredTags;
  } else return [];
};
export const get_tags_status = (state) => state.tags.status;
