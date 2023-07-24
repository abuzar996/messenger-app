import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: [],
  darkmode: true,
  notifyCount: 0,
  isMounted: false,
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
  },
});
export const { changeTheme, changeNotify, setIsMounted } =
  appSettingSlice.actions;
export default appSettingSlice.reducer;
