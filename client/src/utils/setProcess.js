import { UISliceActions } from "../store/UISlice";

const setLoadingProcess = (dispatch, loadingMsg) => {
  dispatch(
    UISliceActions.setProcess({
      active: true,
      loading: {
        status: true,
        msg: loadingMsg,
      },
    })
  );
};

const setResultProcess = (dispatch, status, resultMsg) => {
  dispatch(
    UISliceActions.setProcess({
      active: true,
      loading: {
        status: false,
        msg: undefined,
      },
      result: {
        status: status,
        msg: resultMsg,
      },
    })
  );
};

const setProcess = { setLoadingProcess, setResultProcess };

export default setProcess;
