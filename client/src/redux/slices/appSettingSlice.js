import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/data";
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

export const addSettingsForNewUser = createAsyncThunk(
  "AddSettingsForNewUser",
  async () => {
    try {
      return await axios
        .post(`${API}/settings/add-new-user-settings`)
        .then((response) => response)
        .catch((error) => error.response);
    } catch (err) {
      return err.message;
    }
  }
);

export const getUserSettings = createAsyncThunk(
  "GetDefaultSettings",
  async (userId) => {
    try {
      return await axios
        .get(`${API}/settings/get-settings-of-user/${userId}`, {
          headers: { token: localStorage.getItem("Token") },
        })
        .then((response) => response)
        .catch((error) => error.response);
    } catch (err) {
      return err.message;
    }
  }
);

export const changeUserSettings = createAsyncThunk(
  "ChangeUserSettings",
  async (userId) => {
    try {
      return await axios
        .post(
          `${API}/settings/change-settings-of-user`,
          { userId: userId },
          {
            headers: { token: localStorage.getItem("Token") },
          }
        )
        .then((response) => response)
        .catch((error) => error.response);
    } catch (err) {
      return err.message;
    }
  }
);
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
  extraReducers: (builder) => {
    builder.addCase(getUserSettings.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserSettings.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.darkmode = action.payload.data.darkMode;
        state.loading = false;
        state.error = "";
      } else {
        state.error = "cannot fetch user settings";
      }
    });
    builder.addCase(getUserSettings.rejected, (state) => {
      state.loading = false;
      state.error = "cannot fetch user settings";
    });

    builder.addCase(changeUserSettings.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(changeUserSettings.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.darkmode = !state.darkmode;
        state.loading = false;
        state.error = "";
      } else {
        state.error = "cannot fetch user settings";
      }
    });
    builder.addCase(changeUserSettings.rejected, (state) => {
      state.loading = false;
      state.error = "cannot fetch user settings";
    });

    builder.addCase(addSettingsForNewUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addSettingsForNewUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addSettingsForNewUser.rejected, (state) => {
      state.loading = false;
      state.error = "cannot fetch user settings";
    });
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
