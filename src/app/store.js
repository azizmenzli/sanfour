import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import commandSlice from "../features/slices/commandSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    command:commandSlice
  },
});
