import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

// Async action to fetch users
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosClient.get("/users");
      return response;
    } catch (error) {
      return error;
    }
  }
);

// Initial state for user slice
const initialValue = {
  users: [],  // Empty array for users
  loading: false,
  loggedInUser: null,  // Logged in user can be null initially
};

// Redux slice for user management
export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialValue,
  reducers: {
    login: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      console.log("Fetching users rejected. Error:", action.error.message);
    });
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;