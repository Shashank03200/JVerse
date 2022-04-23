import { authSliceActions } from "./authSlice";

import setToastData from "../utils/showToast";
import axios from "axios";
import { getTokens, setToken } from "../utils/handleTokens";
import checkSession from "../utils/checkSession";
import routeInstance from "../routes.instance";
import setProcess from "../utils/setProcess";

import { userSliceActions } from "./userSlice";

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
        userSliceActions.setUserData({
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
