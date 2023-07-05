import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import axios from "axios";
import { baseInstance } from "../API/instance";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.subscribe(() => {
  let token = store.getState().user.token;
  baseInstance.defaults.headers.common["Authorization"] = token;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
