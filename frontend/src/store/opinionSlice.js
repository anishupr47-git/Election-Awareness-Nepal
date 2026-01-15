import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../utils/api.js"

const initialState = { items: [], total: 0, status: "idle", error: null }

export const fetchOpinion = createAsyncThunk("opinion/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get("/opinion/")
    return res.data
  } catch {
    return thunkAPI.rejectWithValue("Failed to load opinion")
  }
})

const slice = createSlice({
  name: "opinion",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchOpinion.pending, (s) => {
      s.status = "loading"
      s.error = null
    })
    b.addCase(fetchOpinion.fulfilled, (s, a) => {
      s.status = "succeeded"
      s.items = a.payload?.items || []
      s.total = typeof a.payload?.total === "number" ? a.payload.total : (s.items || []).reduce((sum, x) => sum + (x.count || 0), 0)
    })
    b.addCase(fetchOpinion.rejected, (s, a) => {
      s.status = "failed"
      s.error = a.payload
    })
  },
})

export default slice.reducer
