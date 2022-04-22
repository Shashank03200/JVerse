import { authSliceActions } from "./authSlice";

import setToastData from "../utils/showToast";
import axios from "axios";
import { getTokens, setToken } from "../utils/handleTokens";
import checkSession from "../utils/checkSession";
import routeInstance from "../routes.instance";
import setProcess from "../utils/setProcess";
import { feedSliceActions } from "./feedSlice";

export const signUser = (requestObject) => {
  return async (dispatch) => {
    try {
      dispatch(authSliceActions.setAuthLoadingBtnState(true));
      const response = await axios(requestObject);
      const resData = await response.data;

      setToken(resData.data.accessToken, resData.data.refreshToken);
      setToastData(dispatch, resData);
      dispatch(authSliceActions.loginUser());
      await checkSession(dispatch);
      dispatch(authSliceActions.setAuthLoadingBtnState(false));
    } catch (err) {
      const errorData = err.response.data;
      setToastData(dispatch, { ...errorData });
      dispatch(authSliceActions.setAuthLoadingBtnState(false));
      authSliceActions.logoutUser();
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    try {
      const refreshToken = getTokens().refreshToken;
      setProcess.setLoadingProcess(dispatch, "Logging out");
      const response = await routeInstance({
        method: "post",
        url: "/api/auth/logout",
        data: { refreshToken },
      });
      console.log("response", response);
      dispatch(
        feedSliceActions.setUserData({
          userId: null,
          userProfileImage: null,
          userName: null,
          userFullName: null,
          bio: undefined,
        })
      );
      setProcess.setResultProcess(dispatch, true, "Logged out");
    } catch (err) {
      setProcess.setResultProcess(dispatch, false, "Action Unauthorized");
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
