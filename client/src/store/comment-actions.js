import routeInstance from "../routes.instance";
import setToastData from "../utils/showToast";

export const getLatestComments = async (
  dispatch,
  postId,
  setLatestComments
) => {
  try {
    const response = await routeInstance({
      url: `/api/comments/${postId}/latest`,
      method: "get",
    });

    if (response) {
      if (response.status === 200) {
        const data = await response.data;
        setLatestComments(data);
      } else {
        setToastData(dispatch);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
