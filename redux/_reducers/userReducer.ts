import Cookies from "js-cookie";
import { IAction, IUser } from "interface";

import {
  LOGOUT_USER,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
  USER_INFO_SUCCESS,
  GET_USERS,
  GET_USER,
  USER_REQUEST,
  USER_FAILED,
} from "../types";

const initialState = {
  loading: false,
  users: [],
  admins: [],
  customers: [],
  user: null,
};

const userReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case USER_REQUEST:
      return { ...state, loading: true };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case GET_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload,
        admins: payload.filter((user: Partial<IUser>) => user.isAdmin),
        customers: payload.filter((user: Partial<IUser>) => !user.isAdmin),
      };

    case USER_FAILED:
      return { ...state, loading: false };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
