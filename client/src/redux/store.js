import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSettingSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: { appReducer, authReducer },
});
