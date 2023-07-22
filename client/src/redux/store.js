import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSettingSlice";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: { appReducer, authReducer, notify: notificationReducer },
});
