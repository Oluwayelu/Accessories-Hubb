import Cookies from "js-cookie";
import { IAction } from "interface";

import {
  LOGOUT_USER,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
  USER_INFO_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_INFO_FAILED:
      return { ...state, loading: false };
    case LOGOUT_USER:
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default userReducer;
