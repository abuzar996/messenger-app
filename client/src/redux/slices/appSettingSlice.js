import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: [],
  darkmode: true,
  notifyCount: 0,
  isMounted: false,
  addFriendsModal: false,
  sendMessageModal: false,
};

const appSettingSlice = createSlice({
  name: "App Slice",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.darkmode === false
        ? (state.darkmode = true)
        : (state.darkmode = false);
    },
    changeNotify: (state) => {
      state.notifyCount = state.notifyCount + 1;
    },
    setIsMounted: (state) => {
      state.isMounted = true;
    },
    openAddfriendsModal: (state) => {
      state.addFriendsModal = true;
    },
    closeAddfriendsModal: (state) => {
      state.addFriendsModal = false;
    },
    openSendMessageModal: (state) => {
      state.sendMessageModal = true;
    },
    closeSendMessageModal: (state) => {
      state.sendMessageModal = false;
    },
  },
});
export const {
  changeTheme,
  changeNotify,
  setIsMounted,
  openAddfriendsModal,
  closeAddfriendsModal,
  openSendMessageModal,
  closeSendMessageModal,
} = appSettingSlice.actions;
export default appSettingSlice.reducer;
