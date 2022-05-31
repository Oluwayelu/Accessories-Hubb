import { IAction } from "interface";
import { nextLocalStorage } from "utils";

import { USER_INFO } from "../types";

const initialState = {
  userInfo: nextLocalStorage()?.getItem("userInfo")
    ? JSON.parse(nextLocalStorage()?.getItem("userInfo")!)
    : null,
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
