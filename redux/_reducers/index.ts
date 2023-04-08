import Cookies from "js-cookie";
import { combineReducers } from "redux";

import auth from "./authReducer";
import user from "./userReducer";
import cart from "./cartReducer";
import admin from "./adminReducer";
import order from "./orderReducer";
import coupon from "./couponReducer";
import product from "./productReducer";
import favourite from "./favouriteReducer";
import notification from "./notificationReducer";

import {
  loadingReducer as loading,
  errorReducer as error,
} from "./commonReducer";

export const initialState = {};

export const rootReducer = combineReducers({
  auth,
  user,
  cart,
  admin,
  error,
  order,
  coupon,
  product,
  loading,
  favourite,
  notification,
});
