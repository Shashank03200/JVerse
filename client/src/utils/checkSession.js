import routeInstance from "../api/routes.instance";

import { userSliceActions } from "../store/userSlice";

const checkSession = (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await routeInstance({
        method: "get",
        url: "/api/auth/user",
      });

      if (response.status === 200) {
        console.log(response);
        const resData = await response.data;
        dispatch(userSliceActions.setUserData({ ...resData.data }));
        resolve(resData);
      }
    } catch (error) {
      reject();
    }
  });
};

export default checkSession;
