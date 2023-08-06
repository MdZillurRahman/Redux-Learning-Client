import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchForum = createAsyncThunk(
  "forum/fetchForum",
  async () => {
    const res = await axios.get("https://redux-server-53il.onrender.com/forums");
    return res.data;
  }
);

export const postForum = createAsyncThunk("routes/postRoutes", async (variables) => {
  const res = await axios.post("https://redux-server-53il.onrender.com/forums", variables);
  return res.data;
});

const forumSlice = createSlice({
  name: "forums",
  initialState: {
    isLoading: false,
    forums: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchForum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.forums = action.payload;
      state.error = null;
    });
    builder.addCase(fetchForum.rejected, (state, action) => {
      state.isLoading = false;
      state.forums = [];
      state.error = action.error.message;
    });
  },
});

export default forumSlice.reducer;
