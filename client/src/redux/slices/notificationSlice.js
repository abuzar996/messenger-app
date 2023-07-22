import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

const notificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notification.push(action.payload);
    },
  },
});
export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
