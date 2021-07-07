import type { Middleware, Action, Dispatch } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { videosApi } from "./video";

export const utilityMiddleware: Middleware<any, any, Dispatch<Action>> = (store) => (next) => (action) => {
  if (action.type === PURGE) {
    store.dispatch(videosApi.util.resetApiState());
  }
  next(action);
};
