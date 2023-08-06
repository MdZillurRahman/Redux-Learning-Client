import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (email) => {
  const res = await axios.delete(`https://redux-server-53il.onrender.com/users/${email}`);
  return res.data;
});
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("https://redux-server-53il.onrender.com/users");
  return res.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
