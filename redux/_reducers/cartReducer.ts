import { nextLocalStorage } from "utils";
import { CART_ADD_ITEM } from "redux/types";

import type { IAction } from "interface";

const initialState = {
  totalQuantity: nextLocalStorage()?.getItem("totalCartQuantity")
    ? parseInt(nextLocalStorage()?.getItem("totalCartQuantity")!)
    : 0,
  cartItems: nextLocalStorage()?.getItem("cartItems")
    ? JSON.parse(nextLocalStorage()?.getItem("cartItems")!)
    : [],
  shippingAddress: nextLocalStorage()?.getItem("shippingAddress")
    ? JSON.parse(nextLocalStorage()?.getItem("shippingAddress")!)
    : { location: {} },
  paymentMethod: nextLocalStorage()?.getItem("paymentMethod")
    ? JSON.parse(nextLocalStorage()?.getItem("paymentMethod")!)
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
