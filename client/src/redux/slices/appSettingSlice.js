import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: [],
  darkmode: true,
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
  },
});
export const { changeTheme } = appSettingSlice.actions;
export default appSettingSlice.reducer;
