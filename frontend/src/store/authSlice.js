import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/token/", {
      username: data.username,
      password: data.password,
    });
    return res.data; // {access, refresh}
  } catch (err) {
    return rejectWithValue(err?.response?.data?.detail || "Auth failed");
  }
});

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register/", {
      username: data.username,
      email: data.email || "",
      password: data.password,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.detail || "Registration failed");
  }
});

export const fetchMe = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/me/");
    return res.data;
  } catch (err) {
    return rejectWithValue(null);
  }
});

const slice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(login.fulfilled, (s, a) => {
      s.loading = false;
      s.access = a.payload.access;
      s.refresh = a.payload.refresh;
      localStorage.setItem("access", a.payload.access);
      localStorage.setItem("refresh", a.payload.refresh);
    });
    b.addCase(login.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Auth failed";
    });

    b.addCase(register.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(register.fulfilled, (s) => {
      s.loading = false;
    });
    b.addCase(register.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Registration failed";
    });

    b.addCase(fetchMe.fulfilled, (s, a) => {
      s.user = a.payload;
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
