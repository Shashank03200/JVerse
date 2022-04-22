import routeInstance from "../routes.instance";
import setToastData from "../utils/showToast";
import { feedSliceActions } from "./feedSlice";

import setProcess from "../utils/setProcess";
import { UISliceActions } from "./UISlice";

export const createNewPost = (formData) => async (dispatch) => {
  setProcess.setLoadingProcess(dispatch, "Uploading your post");
  routeInstance
    .post("/api/posts/newpost", formData)
    .then(async (response) => {
      const resData = await response.data;

      setProcess.setResultProcess(dispatch, true, "Post Uploaded");
      dispatch(UISliceActions.toggleModalVisibility());
      dispatch(feedSliceActions.addNewPost(resData.data));
    })
    .catch((error) => {
      console.log(error);

      setProcess.setResultProcess(dispatch, false, "Upload Error");
    });
};

export const checkLikeStatus = async (postId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await routeInstance(`/api/posts/${postId}/likestatus`, {
      headers: { Authorization: "Bearer " + accessToken },
    });

    const data = await response.data;

    if (data.likeState === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeDislikePostHandler = async (dispatch, postId) => {
  try {
    const response = await routeInstance({
      url: `/api/posts/${postId}/like`,
      method: "POST",
      headers: {},
    });

    console.log(response);
    const data = await response.data;
    dispatch();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteActionHandler = (postId) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      setProcess.setLoadingProcess(dispatch, "Deleting your post");
      try {
        const response = await routeInstance({
          url: `/api/posts/${postId}`,
          method: "DELETE",
          headers: {},
        });

        if (response.status === 200) {
          dispatch(feedSliceActions.deletePost(postId));
          setProcess.setResultProcess(dispatch, true, "Post Deleted");
          return resolve("Post deleted");
        }
      } catch (error) {
        setProcess.setResultProcess(dispatch, false, "Operation failed");
      }
    });
  };
};

export const commentDeleteActionHandler = (commentId, postId) => {
  return async (dispatch) => {
    try {
      const response = await routeInstance({
        method: "delete",
        url: `/api/comments/${commentId}`,
        headers: {},
        data: {
          postId,
        },
      });
      const resData = await response.data;
      setToastData(dispatch, { ...resData });
    } catch (err) {
      setToastData(dispatch);
    }
  };
};
