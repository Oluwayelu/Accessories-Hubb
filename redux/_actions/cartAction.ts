import axios from "axios";

import { getError } from "utils/error";
import { nextLocalStorage } from "utils";
import { CART_ADD_ITEM, CLEAR_ERROR, GET_ERROR, LOADING } from "redux/types";

import type { IProduct, ICartItems } from "interface";

const API_URL = process.env.API_URL;
export const addToCart: Function =
  (
    cart: { totalQuantity: number; cartItems: ICartItems[] },
    product: IProduct | ICartItems,
    quantity = 1
  ) =>
  async (dispatch: Function) => {
    try {
      const existItem = cart.cartItems.find(
        (x: IProduct | ICartItems) => x._id === product._id
      );
      const itemQuantity = existItem ? existItem.quantity + quantity : 1;

      if (product.countInStock < itemQuantity) {
        dispatch({
          type: GET_ERROR,
          payload: "Sorry. Product is out of stock",
        });
        return;
      }
      const newItem = { ...product, quantity: itemQuantity };
      const cartItems = existItem
        ? cart.cartItems.map((item: IProduct | ICartItems) =>
            item._id === existItem._id ? newItem : item
          )
        : [...cart.cartItems, newItem];

      const totalQuantity = cartItems.reduce(
        (quantity, item) => quantity + item.quantity,
        0
      );

      nextLocalStorage()?.setItem("cartItems", JSON.stringify(cartItems));
      nextLocalStorage()?.setItem(
        "totalCartQuantity",
        totalQuantity.toString()
      );
      dispatch({
        type: CART_ADD_ITEM,
        payload: { cartItems, totalQuantity },
      });
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: getError(err),
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 5000);
    }
  };

export const removeCart: Function =
  (
    cart: { totalQuantity: number; cartItems: ICartItems[] },
    product: IProduct | ICartItems
  ) =>
  async (dispatch: Function) => {
    try {
      const cartItems = cart.cartItems.filter(
        (item) => item._id !== product._id
      );

      const totalQuantity = cartItems.reduce(
        (quantity, item) => quantity + item.quantity,
        0
      );

      nextLocalStorage()?.setItem("cartItems", JSON.stringify(cartItems));
      nextLocalStorage()?.setItem(
        "totalCartQuantity",
        totalQuantity.toString()
      );

      dispatch({
        type: CART_ADD_ITEM,
        payload: { cartItems, totalQuantity },
      });
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: getError(err),
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 5000);
    }
  };
