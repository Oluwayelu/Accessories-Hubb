import Cookies from "js-cookie";
import {
  GET_ORDER_HISTORY,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "redux/types";

import type { IAction } from "interface";

const initialState = {
  loading: false,
  totalQuantity: Cookies.get("totalOrderQuantity")
    ? parseInt(Cookies.get("totalOrderQuantity")!)
    : 0,
  orderItems: Cookies.get("orders-history")
    ? JSON.parse(Cookies.get("orders-history")!)
    : [],
  currOrder: {},
};

const orderReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_ORDER_HISTORY:
      const { orderItems, totalQuantity } = payload;
      return { ...state, loading: false, orderItems, totalQuantity };

    case GET_ORDER_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, currOrder: payload };
    default:
      return state;
  }
};

export default orderReducer;
