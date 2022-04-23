import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed Slice",
  initialState: {
    pageNo: 1,
    morePosts: true,
    timelinePosts: [],
  },

  reducers: {
    setTimelinePosts(state, action) {
      state.timelinePosts = [...state.timelinePosts, ...action.payload];
    },
    setPage(state, action) {
      state.pageNo = action.payload.pageNo;
    },
    incrementPage(state) {
      state.pageNo += 1;
    },
    setMorePostsBoolean(state, action) {
      state.morePosts = action.payload;
    },
    addNewPost(state, action) {
      state.timelinePosts.unshift(action.payload);
    },
    deletePost(state, action) {
      const requestedPostId = action.payload;

      const posts = state.timelinePosts;
      const foundPostIndex = posts.findIndex(
        (post) => post._id === requestedPostId
      );
      if (foundPostIndex === -1) {
        console.log("Invalid Operation");
      } else {
        state.timelinePosts.splice(foundPostIndex, 1);
      }
    },
  },
});

export const feedSliceActions = feedSlice.actions;

export default feedSlice.reducer;
