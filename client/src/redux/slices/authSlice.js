import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3001";
const initialState = {
  loading: false,
  isAuthenticated: false,
  email: "",
  error: "",
};
export const loginUser = createAsyncThunk("loginUser", async (param) => {
  const response = await axios
    .post(`${API}/users/login`, param)
    .then((response) => response)
    .catch((error) => error.response);
  return response;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginWithToken: (state) => {
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("Token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.isAuthenticated = true;
        state.email = action.payload.data.email;
        state.error = "";
        localStorage.setItem("Token", action.payload.data.authToken);
        localStorage.setItem("Email", action.payload.data.email);
      } else if (action.payload.status === 400) {
        state.isAuthenticated = false;
        state.error = "Cannot Login";
        state.email = "";
      } else {
        state.isAuthenticated = false;
        state.error = action.payload.data.message || "Network Error";
        state.email = "";
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { logoutUser, loginWithToken } = AuthSlice.actions;
export default AuthSlice.reducer;
