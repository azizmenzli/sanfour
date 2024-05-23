import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import commandSlice from "../features/slices/commandSlice"
import vendeursSlice from "../features/slices/vendeursSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    command:commandSlice,
    vendeurs:vendeursSlice
  },
});
