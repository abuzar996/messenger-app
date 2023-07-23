import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSettingSlice";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
console.log("store reInitialized");
export const store = configureStore({
  reducer: {
    appReducer: appReducer,
    authReducer: authReducer,
    notify: notificationReducer,
  },
});
