import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/data";
const initialState = {
  chatlist: [],
  clickedId: -1,
  tunnedChatList: [],
  messages: [],
  messageRecordId: -1,
  messagesLoading: false,
  addMessageLoading: false,
  addNewMessageRecordLoading: false,
  addNewMessageRecordValue: -1,
  addNewChatLoading: false,
  loading: false,
  deleteLoading: false,
  deleteRecordLoading: false,
  privateMessages: -1,
  error: "",
};

export const deleteChatRecord = createAsyncThunk(
  "DeleteChatRecord",
  async (data) => {
    return await axios
      .post(`${API}/chats/delete-chat-record`, data, {
        headers: { token: localStorage.getItem("Token") },
      })
      .then((response) => response)
      .catch((error) => error.response);
  }
);

export const addNewChatList = createAsyncThunk("AddNewChat", async (data) => {
  return await axios
    .post(`${API}/chats/add-new-chat-to-list`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
});

export const deleteSelectedMessage = createAsyncThunk(
  "DeleteSelectedMessage",
  async (data) => {
    return await axios
      .post(
        `${API}/chats/delete-selected-chat`,
        { recordId: data.messageRecordId, messageId: data.clickedId },
        {
          headers: { token: localStorage.getItem("Token") },
        }
      )
      .then((response) => response)
      .catch((error) => error.response);
  }
);

export const addNewMessage = createAsyncThunk("addNewMessage", async (data) => {
  return await axios
    .post(`${API}/chats/add-new-message`, data, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
});

export const addNewMessageRecord = createAsyncThunk(
  "addNewMessageRecord",
  async (data) => {
    return await axios
      .post(
        `${API}/chats/add-new-message-record`,
        { data: data },
        {
          headers: { token: localStorage.getItem("Token") },
        }
      )
      .then((response) => response)
      .catch((error) => error.response);
  }
);

export const getChatList = createAsyncThunk("getChatList", async (userId) => {
  return await axios
    .get(`${API}/chats/get-chat-list-by-id/${userId}`, {
      headers: { token: localStorage.getItem("Token") },
    })
    .then((response) => response)
    .catch((error) => error.response);
});

export const fetchAllMessages = createAsyncThunk(
  "fetchMessages",
  async (userId) => {
    return await axios
      .get(`${API}/chats/fetch-messages-of-user/${userId}`, {
        headers: { token: localStorage.getItem("Token") },
      })
      .then((response) => response)
      .catch((error) => error.response);
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeLength: (state, action) => {
      state.privateMessages = action.payload;
    },
    tuneChatData: (state, action) => {
      state.tunnedChatList = action.payload;
    },
    updateTriggers: (state) => {
      state.addNewMessageRecordValue = -1;
    },
    changeSelectedId: (state, action) => {
      state.clickedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatList.pending, (state) => {
      state.loading = true;
      state.chatlist = [];
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

    builder.addCase(fetchAllMessages.pending, (state) => {
      state.messagesLoading = true;
      state.messageRecordId = -1;
      state.messages = [];
    });
    builder.addCase(fetchAllMessages.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        if (action.payload.data.messageData) {
          state.messages = action.payload.data.messageData;
          state.messageRecordId = action.payload.data.message;
        } else {
          state.messageRecordId = -1;
          state.messages = [];
        }
      } else {
        state.messages = [];
      }

      state.messagesLoading = false;
    });
    builder.addCase(fetchAllMessages.rejected, (state, action) => {
      state.error = action.payload.message;
      state.messagesLoading = false;
      state.messages = [];
    });

    builder.addCase(addNewMessage.pending, (state) => {
      state.addMessageLoading = true;
    });
    builder.addCase(addNewMessage.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.addMessageLoading = false;
      } else {
        state.addMessageLoading = true;
      }
    });
    builder.addCase(addNewMessage.rejected, (state, action) => {
      state.error = action.payload.message;
      state.addMessageLoading = false;
    });

    builder.addCase(addNewMessageRecord.pending, (state) => {
      state.addNewMessageRecordLoading = true;
      state.messageRecordId = -1;
    });
    builder.addCase(addNewMessageRecord.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.addNewMessageRecordValue = action.payload.data.result;
        state.messageRecordId = action.payload.data.result;
        state.addNewMessageRecordLoading = false;
      } else {
        state.addNewMessageRecordLoading = true;
        state.messageRecordId = -1;
      }
    });
    builder.addCase(addNewMessageRecord.rejected, (state, action) => {
      state.error = action.payload.message;
      state.addNewMessageRecordLoading = false;
      state.messageRecordId = -1;
    });

    builder.addCase(addNewChatList.pending, (state) => {
      state.addNewChatLoading = true;
    });
    builder.addCase(addNewChatList.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.addNewChatLoading = false;
      } else {
        state.addNewChatLoading = false;
        state.error = "Something went wrong";
      }
    });
    builder.addCase(addNewChatList.rejected, (state, action) => {
      state.error = "Something went wrong";
      state.addNewChatLoading = false;
    });

    builder.addCase(deleteSelectedMessage.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteSelectedMessage.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.deleteLoading = false;
      } else {
        state.deleteLoading = false;
        state.error = "Something went wrong";
      }
    });
    builder.addCase(deleteSelectedMessage.rejected, (state, action) => {
      state.error = "Something went wrong";
      state.deleteLoading = false;
    });

    builder.addCase(deleteChatRecord.pending, (state) => {
      state.deleteRecordLoading = true;
    });
    builder.addCase(deleteChatRecord.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.deleteRecordLoading = false;
      } else {
        state.deleteRecordLoading = false;
        state.error = "Something went wrong";
      }
    });
    builder.addCase(deleteChatRecord.rejected, (state, action) => {
      state.error = "Something went wrong";
      state.deleteRecordLoading = false;
    });
  },
});
export const { tuneChatData, updateTriggers, changeSelectedId, changeLength } =
  chatSlice.actions;
export default chatSlice.reducer;
