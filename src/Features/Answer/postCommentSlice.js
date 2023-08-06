import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (id) => {
    const res = await axios.get(
      `https://redux-server-53il.onrender.com/forumsAnswer/${id}`
    );
    // console.log(res.data);
    return res.data;
  }
);

export const postComment = createAsyncThunk(
  "routes/postRoutes",
  async (variables) => {
    const res = await axios.post(
      "https://redux-server-53il.onrender.com/forumsAnswer",
      variables
    );
    return res.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isLoading: false,
    comment: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
      state.error = null;
    });
    builder.addCase(fetchComment.rejected, (state, action) => {
      state.isLoading = false;
      state.comment = [];
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
