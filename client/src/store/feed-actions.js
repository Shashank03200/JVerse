import { UISliceActions } from "./UISlice";
import { feedSliceActions } from "./feedSlice";
import setProcess from "../utils/setProcess";
import routeInstance from "../routes.instance";
import setToastData from "../utils/showToast";

export const loadUserDataUsingToken = () => {
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        method: "get",
        url: "/api/auth/user",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.data;
      const userData = resData.data;

      dispatch(feedSliceActions.setUserData({ ...userData }));
    } catch (error) {
      setToastData(dispatch, error);
    }
  };
};

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

export const loadSuggestedUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await routeInstance({
        url: "/api/users/suggested-users",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.data;
      resolve(resData);
    } catch (err) {
      console.log(err);
      reject({
        success: false,
        msg: err,
      });
    }
  });
};

export const followUser =
  (userId, isFollowing, setFollowProcessLoading, setIsFollowing) =>
  async (dispatch) => {
    try {
      setFollowProcessLoading(true);
      const response = await routeInstance({
        url: `/api/users/${userId}/${isFollowing ? "un" : ""}follow`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      const resData = await response.data;

      setToastData(dispatch, resData);
      setIsFollowing((prevState) => !prevState);
      setFollowProcessLoading(false);
    } catch (err) {
      console.log(err);
      const backendErrorData = err.response.data;
      setToastData(dispatch, { ...backendErrorData });
      setFollowProcessLoading(false);
    }
  };

export const updateUser = (profileSetupFormData) => async (dispatch) => {
  try {
    setProcess.setLoadingProcess(dispatch, "Updating your details");

    const response = await routeInstance.put(
      "/api/users/update",
      profileSetupFormData
    );

    const resData = await response.data;

    dispatch(feedSliceActions.setUserData({ ...resData.data }));
    dispatch(feedSliceActions.setMorePostsBoolean(true));
    setProcess.setResultProcess(dispatch, true, "Details Updated");
  } catch (error) {
    console.log(error);
    setProcess.setResultProcess(dispatch, false, "Operation failed");
    // setToastData(dispatch);
  }
};

export const fetchProfileData = (setFetchedData, username) => {
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        method: "get",
        url: `/api/posts/allposts/${username}`,
      });
      const resData = await response.data;
      // dispatch(feedSliceActions.setUserData({ ...resData.data }));
      setFetchedData(resData.data);
      dispatch(UISliceActions.setPageLoading({ isPageLoading: false }));
    } catch (err) {
      setToastData(dispatch);
    }
  };
};
