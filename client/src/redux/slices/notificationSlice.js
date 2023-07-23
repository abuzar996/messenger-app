import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};
const createUUID = () => {
  const pattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const notificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notification.push({ ...action.payload, id: createUUID() });
    },
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(
        (not) => not.id !== action.payload
      );
    },
  },
});
export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
