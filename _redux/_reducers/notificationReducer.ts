import Cookies from "js-cookie";
import {
  GET_NOTIFICATION,
  READ_NOTIFICATION,
  NOTIFICATION_FAILED,
  NOTIFICATION_REQUEST,
} from "_redux/types";

import type { IAction } from "interface";

const initialState = {
  unread: 0,
  loading: false,
  notifications: [],
};

const orderReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case NOTIFICATION_REQUEST: {
      return { ...state, loading: true };
    }

    case NOTIFICATION_FAILED:
      return { ...state, loading: false };

    case READ_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: payload.notifications,
        unread: payload.unread,
      };

    case GET_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: payload.notifications,
        unread: payload.unread,
      };

    default:
      return state;
  }
};

export default orderReducer;
