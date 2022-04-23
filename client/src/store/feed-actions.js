import { feedSliceActions } from "./feedSlice";
import routeInstance from "../routes.instance";
import setToastData from "../utils/showToast";
import { userSliceActions } from "./userSlice";

export const loadTimelinePosts = (page) => {
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        url: `/api/posts/timeline?page=${page}&count=3`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.data;
      const data = resData.data;

      if (data.length === 0) {
        dispatch(feedSliceActions.setMorePostsBoolean(false));
      } else dispatch(feedSliceActions.setTimelinePosts(data));
    } catch (error) {
      dispatch(feedSliceActions.setMorePostsBoolean(false));
      setToastData(dispatch);
    }
  };
};
