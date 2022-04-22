import { removeTokens } from "../utils/handleTokens";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
    authBtnLoading: false,
  },

  reducers: {
    loginUser(state) {
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      removeTokens();
    },
    setAuthLoadingBtnState(state, action) {
      state.authBtnLoading = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
