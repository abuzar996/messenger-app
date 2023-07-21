import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: [],
  darkmode: true,
  notifyCount: 0,
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
      // console.log("hello");
      state.notifyCount = state.notifyCount + 1;
    },
  },
});
export const { changeTheme, changeNotify } = appSettingSlice.actions;
export default appSettingSlice.reducer;
