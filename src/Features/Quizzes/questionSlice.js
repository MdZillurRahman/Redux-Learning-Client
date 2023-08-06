import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchQuestion = createAsyncThunk(
  "question/fetchQuestion",
  async ({name, count}) => {
    const res = await axios.get(
      "https://redux-server-53il.onrender.com/doc"
    );
    const final = res?.data?.filter((a) => a.nestedRoute === name);
    const ques = final[0].content;

    const q = ques?.filter((a) => parseInt(a.id) === count);
    // console.log(q[0]);
    return q[0];
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    isLoading1: false,
    question: [],
    error1: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestion.pending, (state) => {
      state.isLoading1 = true;
    });
    builder.addCase(fetchQuestion.fulfilled, (state, action) => {
      state.isLoading1 = false;
      state.question = action.payload;
      state.error1 = null;
    });
    builder.addCase(fetchQuestion.rejected, (state, action) => {
      state.isLoading1 = false;
      state.question = [];
      state.error1 = action.error.message;
    });
  },
});

export default questionSlice.reducer;
