import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (name) => {
    const res = await axios.get("https://redux-server-53il.onrender.com/doc");
    const final = res?.data?.filter(a => a.nestedRoute===name)
    const ques = final[0].content
    return ques;
  }
);

export const postQuizzes = createAsyncThunk("routes/postRoutes", async (variables) => {
  const res = await axios.post("https://redux-server-53il.onrender.com/doc", variables);
  return res.data;
});

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: {
    isLoading: false,
    quizzes: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizzes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.quizzes = action.payload;
      state.error = null;
    });
    builder.addCase(fetchQuizzes.rejected, (state, action) => {
      state.isLoading = false;
      state.quizzes = [];
      state.error = action.error.message;
    });
  },
});

export default quizzesSlice.reducer;
