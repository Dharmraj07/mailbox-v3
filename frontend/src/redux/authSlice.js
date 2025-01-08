import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API_BASE_URL = "http://localhost:5000/api/auth";

// Helper function for API calls
const apiCall = async (url, data, rejectWithValue, method = "POST") => {
  try {
    const response = await axios({ url, data, method });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
};

// Async thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) =>
    apiCall(`${API_BASE_URL}/signup`, { email, password }, rejectWithValue)
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) =>
    apiCall(`${API_BASE_URL}/signin`, { email, password }, rejectWithValue)
);

// Load token from localStorage
const persistedToken = localStorage.getItem("token");

// Initial state
const initialState = {
  user: null, // No persisted user data
  token: persistedToken || null, // Restore token
  isLoggedIn: !!persistedToken, // Set logged-in status based on token
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token"); // Remove only the token
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Signin
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;

        // Persist token in local storage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email",action.payload.user.email);
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
