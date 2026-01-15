import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCandidates = createAsyncThunk("candidates/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get("/candidates/");
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Failed to load candidates");
  }
});

export const supportCandidate = createAsyncThunk("candidates/support", async (candidateId, thunkAPI) => {
  try {
    const res = await api.post("/vote/", { candidate_id: candidateId });
    return res.data; 
  } catch (e) {
    const status = e?.response?.status;
    if (status === 401) return thunkAPI.rejectWithValue("LOGIN_REQUIRED");
    if (status === 409) return thunkAPI.rejectWithValue("ALREADY_VOTED");
    return thunkAPI.rejectWithValue("VOTE_FAILED");
  }
});

const slice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(supportCandidate.fulfilled, (state, action) => {
        const { candidate_id, support_count } = action.payload;
        const idx = state.items.findIndex((x) => x.id === candidate_id);
        if (idx >= 0) state.items[idx].support_count = support_count;
      });
  },
});

export default slice.reducer;
