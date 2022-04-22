import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UISlice",
  initialState: {
    toastData: {
      isActive: false,
      title: undefined,
      status: undefined,
    },
    isPageLoading: false,
    isLogoutAlertVisible: false,
    modalProcess: {
      active: false,
      result: {
        status: undefined,
        msg: undefined,
      },
      loading: {
        status: false,
        msg: undefined,
      },
    },
    isModalOpen: false,
  },
  reducers: {
    setToastData(state, action) {
      state.toastData.isActive = action.payload.isActive;
      state.toastData.title = action.payload.title;
      state.toastData.status = action.payload.status;
    },
    resetToastData(state) {
      state.toastData.isActive = false;
      state.toastData.title = undefined;
      state.toastData.status = undefined;
    },
    toggleModalVisibility(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    setProcess(state, action) {
      if (action.payload.active)
        state.modalProcess.active = action.payload.active;
      if (action.payload.loading) {
        const { status, msg } = action.payload.loading;
        state.modalProcess.loading.status = status;
        state.modalProcess.loading.msg = msg;
      }
      if (action.payload.result) {
        const { status, msg } = action.payload.result;
        state.modalProcess.result.status = status;
        state.modalProcess.result.msg = msg;
      }
    },
    resetProcess(state) {
      state.modalProcess.active = false;
      state.modalProcess.loading.status = false;
      state.modalProcess.loading.msg = undefined;
      state.modalProcess.result.status = undefined;
      state.modalProcess.result.msg = undefined;
    },
    setPageLoading(state, action) {
      state.isPageLoading = action.payload.isPageLoading;
    },
    setLogoutAlertVisibility(state, action) {
      state.isLogoutAlertVisible = action.payload.isLogoutAlertVisible;
    },
  },
});

export const UISliceActions = UISlice.actions;

export default UISlice.reducer;
