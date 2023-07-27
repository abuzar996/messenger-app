import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3001";
const initialState = {
  listLoading: false,
  usersList: [],
  user: {},
  loading: false,
  error: "",
  success: false,
};

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios
    .get(`${API}/users/get-all-users`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const addnewUser = createAsyncThunk("addnewUser", async (user) => {
  const response = await axios
    .post(`${API}/users/add-user`, user)
    .then((response) => response)
    .catch((error) => error.response);

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
  reducers: {
    refreshState: (state) => {
      state.success = false;
    },
    removeAllUsers: (state) => {
      state.usersList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
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
      if (action.payload.status === 201) {
        state.success = true;
      } else {
        state.error = action.payload.data.message || "Something Went Wrong";
        state.success = false;
      }
      state.loading = false;
    });
    builder.addCase(addnewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something Went Wrong";
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.listLoading = true;
      state.error = "";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.listLoading = false;
        state.usersList = action.payload.data.users;
      } else {
        state.listLoading = false;
        state.error = "Something went wrong";
      }
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.error = "Something went wrong";
    });
  },
});
export const { refreshState, removeAllUsers } = userSlice.actions;
export default userSlice.reducer;
