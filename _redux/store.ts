import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./_reducers";

import type { AppStore } from "interface";

const persistConfig = {
  key: "ahubb",
  version: 1,
  blacklist: [],
  whitelist: ["cart", "favourite"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export const makestore = () => store;
export const persistor = persistStore(store);
export const wrapper = createWrapper<AppStore>(makestore);
