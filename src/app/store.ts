import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";
import { videosApi } from "./services/video";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: getDefaultMiddleware().concat(videosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
