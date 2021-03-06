import Cookies from "js-cookie";
import { combineReducers } from "redux";
import user from "./userReducer";
import cart from "./cartReducer";
import product from "./productReducer";
import {
  loadingReducer as loading,
  errorReducer as error,
} from "./commonReducer";

export const initialState = {};

export const rootReducer = combineReducers({
  user,
  cart,
  product,
  loading,
  error,
});
