import { nextLocalStorage } from "utils";
import Cookies from "js-cookie";
import {
  CART_ADD_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SELECT_SHIPPING_ADDRESS,
  REMOVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "_redux/types";

import type { IAction } from "interface";

const initialState = {
  totalQuantity: Cookies.get("totalCartQuantity")
    ? parseInt(Cookies.get("totalCartQuantity")!)
    : 0,
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems")!)
    : [],
  selectedAddress: Cookies.get("selectedAddress")
    ? parseInt(Cookies.get("selectedAddress"))
    : null,
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress")!)
    : // : { location: {} },
      [],
  paymentMethod: Cookies.get("paymentMethod")
    ? Cookies.get("paymentMethod")!
    : "",
};

const cartReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case CART_ADD_ITEM:
      const { cartItems, totalQuantity } = payload;
      return { ...state, cartItems, totalQuantity };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload.address,
        selectedAddress: payload.selected,
      };

    case REMOVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload.address,
        selectedAddress: payload.selected,
      };

    case SELECT_SHIPPING_ADDRESS:
      return { ...state, selectedAddress: payload };

    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload };

    default:
      return state;
  }
};

export default cartReducer;
