import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User Slice",
  initialState: {
    userId: null,
    userProfileImage: null,
    userName: null,
    userFullName: null,
    bio: undefined,
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

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
