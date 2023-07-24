import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSettingSlice";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    appReducer: appReducer,
    authReducer: authReducer,
    notify: notificationReducer,
    user: userReducer,
  },
});
