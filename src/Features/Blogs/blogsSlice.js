import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get("https://redux-server-53il.onrender.com/doc");
  return res.data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    isLoading: false,
    blogs: [],
    total: 0,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.isLoading = false;

      state.blogs = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.blogs = [];
      state.error = action.error.message;
    });
  },
});

export default blogsSlice.reducer;
