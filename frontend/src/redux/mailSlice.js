import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper to get the Bearer token
const getToken = () => `Bearer ${localStorage.getItem('token')}`;
const API_BASE_URL = "http://localhost:5000/api/mail";

// Async thunks for handling API requests
export const sendMail = createAsyncThunk('mail/sendMail', async (mailData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send`, mailData, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchInbox = createAsyncThunk('mail/fetchInbox', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inbox`, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchSentBox = createAsyncThunk('mail/fetchSentBox', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sent`, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const markMailAsRead = createAsyncThunk('mail/markMailAsRead', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/mark-as-read/${id}`, null, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteMail = createAsyncThunk('mail/deleteMail', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: { Authorization: getToken() },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
  inbox: [],
  sent: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

// Slice
const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    reciveMail:(state,action)=>{
      state.inbox=[action.payload,...state.inbox];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMail.fulfilled, (state,action) => {
        // console.log(action.payload.mail);
        state.sent = [ action.payload.mail,...state.sent];
        state.isLoading = false;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchInbox.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.isLoading = false;
        state.inbox = action.payload.mails;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSentBox.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSentBox.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sent = action.payload.mails;
      })
      .addCase(fetchSentBox.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(markMailAsRead.fulfilled, (state, action) => {
        const updatedMail = action.payload.mail;
        const index = state.inbox.findIndex((mail) => mail._id === updatedMail._id);
        if (index !== -1) {
          state.inbox[index].isRead = true;
        }
        state.unreadCount -= 1;
      })
      .addCase(deleteMail.fulfilled, (state, action) => {
        const deletedMailId = action.meta.arg;
        state.inbox = state.inbox.filter((mail) => mail._id !== deletedMailId);
        state.sent = state.sent.filter((mail) => mail._id !== deletedMailId);
      });
  },
});

// Export actions and reducer
export const { resetError,reciveMail } = mailSlice.actions;
export default mailSlice.reducer;
