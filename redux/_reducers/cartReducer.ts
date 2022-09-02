import { nextLocalStorage } from "utils";
import Cookies from "js-cookie";
import { CART_ADD_ITEM } from "redux/types";

import type { IAction } from "interface";

const initialState = {
  totalQuantity: Cookies.get("totalCartQuantity")
    ? parseInt(Cookies.get("totalCartQuantity")!)
    : 0,
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems")!)
    : [],
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress")!)
    : { location: {} },
  paymentMethod: Cookies.get("paymentMethod")
    ? Cookies.get("paymentMethod")!
    : "",
};

const cartReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case CART_ADD_ITEM:
      const { cartItems, totalQuantity } = payload;
      return { ...state, cartItems, totalQuantity };

    default:
      return state;
  }
};

export default cartReducer;
