import { createSlice /*, createAsyncThunk*/ } from "@reduxjs/toolkit";
//import axios from "axios";
//const API = "http://localhost:3000";
const initialState = {
  loading: false,
  isAuthenticated: false,
  error: "",
};
// export const loginUser = createAsyncThunk("loginUser", async (param) => {
//   console.log(param);
//   const response = await axios
//     .post(`${API}/users/login`, param)
//     .then((response) => response)
//     .catch((error) => error.response);
//   //console.log(response);
//   if (response.status === 200) {
//     localStorage.setItem("Token", response.data);
//   }
//   return response;
// });
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
    loginUser: (state) => {
      state.isAuthenticated = true;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loginUser.pending, (state, action) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(loginUser.fulfilled, (state, action) => {
  //     state.loading = false;
  //     if (action.payload.status === 200) {
  //       state.isAuthenticated = true;
  //     } else if (action.payload.status === 400) {
  //       state.isAuthenticated = false;
  //       state.error = "Cannot Login";
  //     }
  //   });
  //   builder.addCase(loginUser.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });
  //},
});
export const { logoutUser, loginUser } = AuthSlice.actions;
export default AuthSlice.reducer;
