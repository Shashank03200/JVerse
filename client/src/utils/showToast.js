import { UISliceActions } from "../store/UISlice";

const setToastData = (dispatch, resultData) => {
  dispatch(
    UISliceActions.setToastData({
      isActive: true,
      title: resultData ? resultData.msg : "Something went wrong",
      status: resultData
        ? resultData.success === true
          ? "success"
          : "warning"
        : "error",
    })
  );
};

export default setToastData;
