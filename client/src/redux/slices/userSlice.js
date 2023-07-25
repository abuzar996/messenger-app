import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3001";
const initialState = {
  user: {},
  loading: false,
  error: "",
};

export const addnewUser = createAsyncThunk("addnewUser", async (user) => {
  console.log(user);
  //console.log(user);
  const response = await axios
    .post(`${API}/users/add-user`, user)
    .then((response) => response)
    .catch((error) => error.response);
  console.log(response);
  return response;
});

export const getUser = createAsyncThunk("getUser", async (email) => {
  const response = await axios
    .get(`${API}/users/get-user-by-email/${email}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
  return response;
});
const userSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("hello from getUser");
      state.loading = false;
      if (action.payload.status === 200) {
        state.user = action.payload.data;
        state.loading = false;
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addnewUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addnewUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addnewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something Went Wrong";
    });
  },
});
export default userSlice.reducer;
