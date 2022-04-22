import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed Slice",
  initialState: {
    userId: null,
    userProfileImage: null,
    userName: null,
    userFullName: null,
    bio: undefined,
    pageNo: 1,
    morePosts: true,
    timelinePosts: [],
  },

  reducers: {
    setUserData(state, action) {
      const { _id, profileImage, name, bio, username } = action.payload;

      state.userId = _id;
      state.userFullName = name;
      state.userProfileImage = profileImage;
      state.userName = username;
      state.bio = bio;
    },
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
    resetUserData(state) {
      state.userId = null;
      state.userProfileImage = null;
      state.userName = null;
      state.pageNo = 1;
      state.morePosts = true;
      state.timelinePosts = [];
    },
    setSuggestedUsers(state, action) {
      state.suggestedUsers = action.payload;
    },
    resetSuggestedUsers(state) {
      state.suggestedUsers = undefined;
    },
  },
});

export const feedSliceActions = feedSlice.actions;

export default feedSlice.reducer;
