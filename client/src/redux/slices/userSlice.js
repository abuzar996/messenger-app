import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/data";

const initialState = {
  userByIdLoading: false,
  addLoading: false,
  listLoading: false,
  loading: false,
  allUsersLoading: false,
  allUsers: [],
  desiredUser: {},
  usersList: [],
  friends: [],
  user: {},
  isFriend: false,
  userById: {},
  error: "",
  success: false,
  routeId: -1,
};

export const getAllTheUsers = createAsyncThunk("getAllTheUsers", async () => {
  const response = await axios
    .get(`${API}/users/get-all-users`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const getAllFriends = createAsyncThunk("GetAllFriends", async () => {
  const response = await axios
    .get(`${API}/users/get-user-friends`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const addFriends = createAsyncThunk("addFriends", async (data) => {
  const response = await axios
    .post(`${API}/users/add-to-friend-list`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const removeFriends = createAsyncThunk("removeFriends", async (data) => {
  const response = await axios
    .post(`${API}/users/unfriend-user`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios
    .get(`${API}/users/get-non-friends`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const addnewUser = createAsyncThunk("addToFriendList", async (user) => {
  const response = await axios
    .post(`${API}/users/add-user`, user)
    .then((response) => response)
    .catch((error) => error.response);

  return response;
});

export const checkIfUserHasFriend = createAsyncThunk(
  "checkIfFriend",
  async (friendId) => {
    const response = await axios
      .get(`${API}/users/check-is-friend/${friendId}`, {
        headers: { token: localStorage.getItem("Token") },
      })
      .then((response) => response)
      .catch((error) => error.response);

    return response;
  }
);

export const getUser = createAsyncThunk("getUser", async (email) => {
  const response = await axios
    .get(`${API}/users/get-user-by-email/${email}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
  return response;
});

export const getUserById = createAsyncThunk("getUserById", async (userId) => {
  const response = await axios
    .get(`${API}/users/get-by-id/${userId}`, {
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
    getDesiredUser: (state, action) => {
      if (state.allUsers.length > 0) {
        console.log(state.allUsers);
        console.log(action.payload);
      }
    },
    setUserNull: (state) => {
      state.userById = {};
    },
    storeId: (state, action) => {
      state.routeId = action.payload;
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

    builder.addCase(addFriends.pending, (state) => {
      state.listLoading = true;
      state.error = "";
    });
    builder.addCase(addFriends.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.listLoading = false;
      }
    });
    builder.addCase(addFriends.rejected, (state) => {
      state.error = "Something went wrong";
    });

    builder.addCase(getAllFriends.pending, (state) => {
      state.listLoading = true;
      state.error = "";
    });
    builder.addCase(getAllFriends.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.listLoading = false;
        state.friends = action.payload.data.friends;
      }
    });
    builder.addCase(getAllFriends.rejected, (state) => {
      state.error = "Something went wrong";
    });

    builder.addCase(getUserById.pending, (state) => {
      state.userByIdLoading = true;
      state.error = "";
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.userByIdLoading = false;
        state.userById = action.payload.data.user;
      }
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.error = "Something went wrong";
    });

    builder.addCase(checkIfUserHasFriend.pending, (state) => {
      state.userByIdLoading = true;
      state.error = "";
    });
    builder.addCase(checkIfUserHasFriend.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.userByIdLoading = false;
        state.isFriend = action.payload.data.friends;
      } else {
        state.userByIdLoading = false;
        state.isFriend = action.payload.data.friends;
      }
    });
    builder.addCase(checkIfUserHasFriend.rejected, (state) => {
      state.error = "Something went wrong";
    });

    builder.addCase(removeFriends.pending, (state) => {
      state.userByIdLoading = true;
      state.error = "";
    });
    builder.addCase(removeFriends.fulfilled, (state, action) => {
      state.userByIdLoading = false;
      state.error = "";
    });
    builder.addCase(removeFriends.rejected, (state) => {
      state.error = "Something went wrong";
    });

    builder.addCase(getAllTheUsers.pending, (state) => {
      state.allUsersLoading = true;
      state.error = "";
    });
    builder.addCase(getAllTheUsers.fulfilled, (state, action) => {
      state.allUsersLoading = false;
      state.allUsers = action.payload.data.users;
    });
    builder.addCase(getAllTheUsers.rejected, (state) => {
      state.error = "Something went wrong";
    });
  },
});
export const {
  storeId,
  refreshState,
  removeAllUsers,
  getDesiredUser,
  setUserNull,
} = userSlice.actions;
export default userSlice.reducer;
