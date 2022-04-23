import routeInstance from "../routes.instance";
import setProcess from "../utils/setProcess";
import setToastData from "../utils/showToast";
import { authSliceActions } from "./authSlice";
import { feedSliceActions } from "./feedSlice";
import { UISliceActions } from "./UISlice";
import { userSliceActions } from "./userSlice";

export const updateUser = (profileSetupFormData) => async (dispatch) => {
  try {
    setProcess.setLoadingProcess(dispatch, "Updating your details");

    const response = await routeInstance.put(
      "/api/users/update",
      profileSetupFormData
    );

    const resData = await response.data;

    dispatch(userSliceActions.setUserData({ ...resData.data }));
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
      // dispatch(userSliceActions.setUserData({ ...resData.data }));
      setFetchedData(resData.data);
      dispatch(UISliceActions.setPageLoading({ isPageLoading: false }));
    } catch (err) {
      setToastData(dispatch);
    }
  };
};

export const deleteUserAccount = (currentPassword, userId) => {
  return async (dispatch) => {
    try {
      setProcess.setLoadingProcess(dispatch, "Deleting your account");

      const response = await routeInstance({
        method: "DELETE",
        url: "/api/users/" + userId,
        data: {
          password: currentPassword,
        },
      });

      console.log(response.data);

      const _data = response.data;
      if (_data.success === true) {
        setProcess.setResultProcess(dispatch, true, "Account deleted");
        dispatch(authSliceActions.logoutUser());
      }
    } catch (err) {
      setProcess.setResultProcess(dispatch, false, "Invalid credentials");
      // setToastData(dispatch);
    }
  };
};

export const updateUserPassword = (currentPassword, newPassword, userId) => {
  return async (dispatch) => {
    try {
      setProcess.setLoadingProcess(dispatch, "Updating your account");

      const response = await routeInstance({
        method: "PUT",
        url: "/api/users/" + userId + "/update-password",
        data: {
          currentPassword,
          newPassword,
        },
      });

      const _data = response.data;
      console.log(_data);
      if (_data.success === true) {
        setProcess.setResultProcess(dispatch, true, _data.msg);
      }
    } catch (err) {
      setProcess.setResultProcess(dispatch, false, "Invalid credentials");
      // setToastData(dispatch);
    }
  };
};

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

      dispatch(userSliceActions.setUserData({ ...userData }));
    } catch (error) {
      setToastData(dispatch, error);
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
