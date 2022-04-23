import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./authSlice";
import uiSliceReducer from "./UISlice";
import feedSliceReducer from "./feedSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
    UISlice: uiSliceReducer,
    feed: feedSliceReducer,
  },
});

export default store;
