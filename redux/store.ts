import { configureStore } from "@reduxjs/toolkit";
import nav from "./features/NavSlice";
import mgmt from "./features/MgmtSlice";
import AppSlice from "./features/AppSlice";

export const store = configureStore({
  reducer: {
    nav,
    mgmt,
    AppSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
