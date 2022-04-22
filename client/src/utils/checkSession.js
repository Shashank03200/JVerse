import routeInstance from "../routes.instance";
import { feedSliceActions } from "../store/feedSlice";

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
        dispatch(feedSliceActions.setUserData({ ...resData.data }));
        resolve(resData);
      }
    } catch (error) {
      reject();
    }
  });
};

export default checkSession;
