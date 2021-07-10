import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { youtubeApi } from "./services/youtube";

const rootReducer = combineReducers({
  [youtubeApi.reducerPath]: youtubeApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [youtubeApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(youtubeApi.middleware),
});

// setupListeners(store.dispatch);

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
