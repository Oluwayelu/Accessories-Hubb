// /* eslint-disable no-undef */

// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";

// import { authSlice } from "./slice";

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       [authSlice.name]: authSlice.reducer,
//     },
//     devTools: true,
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

// export const wrapper = createWrapper<AppStore>(makeStore);

import { HYDRATE, createWrapper } from "next-redux-wrapper";
import {
  configureStore,
  Action,
  ThunkAction,
  ActionCreator,
  AnyAction,
  PayloadAction,
  EnhancedStore,
} from "@reduxjs/toolkit";
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
  Persistor,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { initialState, rootReducer } from "./_reducers";

export const makestore = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
    });
  } else {
    const persistConfig = {
      key: "root",
      version: 1,
      blacklist: [],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    type Store = {
      __persistor: Persistor;
    } & EnhancedStore;
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

    store.__persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makestore, {
  debug: true,
});

// import { useDispatch } from "react-redux";
// import { useMemo } from "react";
// import { IAction, AppStore, AppDispatch, AppState } from "interface";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user", "cart"],
// };

// const reducer = (state: AppState, action: IAction) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     return nextState;
//   } else {
//     return rootReducer(state, action);
//   }
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const makestore = () =>
//   configureStore({
//     reducer: persistedReducer,
//     // middleware: (getDefaultMiddleware) =>
//     //   getDefaultMiddleware().prepend(
//     //     nextReduxCookieMiddleware({
//     //       subtrees: ["user.userInfo"],
//     //     })
//     //   ),
//     middleware: [thunk],
//     devTools: process.env.NODE_ENV !== "production",
//   });
// type Store = {
//   getState: () => {};
// };
// let store: Store | undefined;
// export const initializeStore = (preloadedState) => {
//   let _store = store ?? makestore(preloadedState);
//   if (preloadedState && store) {
//     _store = makestore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     store = undefined;
//   }
//   if (typeof window === "undefined") return _store;
//   if (!store) store = _store;
//   return _store;
// };

// export const useStore = (state = initialState) => {
//   const store = useMemo(() => initializeStore(state), [state]);
//   return store;
// };

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const wrapper = createWrapper<AppStore>(makestore, {
//   serializeState: (state) => JSON.stringify(state),
//   deserializeState: (state) => JSON.parse(state),
// });
