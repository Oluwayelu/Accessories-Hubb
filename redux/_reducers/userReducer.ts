import Cookies from "js-cookie";
import { IAction } from "interface";

import { USER_INFO, LOGOUT_USER } from "../types";

const initialState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
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
