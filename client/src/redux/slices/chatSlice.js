import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/data";
const initialState = {
  chatlist: [],
  tunnedChatList: [],
  loading: false,
  error: "",
};

export const getChatList = createAsyncThunk("getChatList", async (userId) => {
  return await axios
    .get(`${API}/chats/get-chat-list-by-id/${userId}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    tuneChatData: (state, action) => {
      state.tunnedChatList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChatList.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.chatlist = action.payload.data;
      } else {
        state.chatlist = [];
      }

      state.loading = false;
    });
    builder.addCase(getChatList.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
      state.chatlist = [];
    });
  },
});
export const { tuneChatData } = chatSlice.actions;
export default chatSlice.reducer;
