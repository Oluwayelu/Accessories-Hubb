/* eslint-disable no-undef */
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore } from "redux";
import { initialState, rootReducer } from "./_reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
