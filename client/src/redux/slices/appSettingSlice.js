import { createSlice } from "@reduxjs/toolkit";
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const initialState = {
  loading: false,
  error: [],
  darkmode: darkThemeMq.matches ? true : false,
  notifyCount: 0,
  profileData: {},
  isMounted: false,
  addFriendsModal: false,
  sendMessageModal: false,
  userProfileModal: false,
  chatsHidden: false,
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
    openProfileModal: (state) => {
      state.userProfileModal = true;
    },
    closeProfileModal: (state) => {
      state.userProfileModal = false;
    },
    setData: (state, action) => {
      state.profileData = action.payload;
    },
    showChats: (state) => {
      state.chatsHidden = false;
    },
    hideChats: (state) => {
      state.chatsHidden = true;
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
  openProfileModal,
  closeProfileModal,
  setData,
  hideChats,
  showChats,
} = appSettingSlice.actions;
export default appSettingSlice.reducer;
