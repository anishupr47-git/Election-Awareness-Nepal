import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice.js"
import candidatesReducer from "./candidatesSlice.js"
import opinionReducer from "./opinionSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidatesReducer,
    opinion: opinionReducer,
  },
})
