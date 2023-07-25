import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3001";
const initialState = {
  users: [],
  loading: false,
  error: "",
};

export const searchUsers = createAsyncThunk("searchUsers", async (string) => {
  const response = await axios
    .get(`${API}/users/user-by-name/${string}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
  return response;
});
const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.users = action.payload.data.users;
      } else {
        state.users = [];
      }
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.error = "Something went wrong!";
    });
  },
});
export default searchSlice.reducer;
