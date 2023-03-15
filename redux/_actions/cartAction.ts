import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getError } from "utils/error";
import {
  CART_ADD_ITEM,
  CLEAR_ERROR,
  GET_ERROR,
  LOADING,
  SAVE_SHIPPING_ADDRESS,
  SELECT_SHIPPING_ADDRESS,
  REMOVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "redux/types";

import type { ICartItems, IShippingAddress } from "interface";

const API_URL = process.env.NEXT_APP_API_URL;
export const addToCart: Function =
  (
    cart: { totalQuantity: number; cartItems: ICartItems[] },
    product: ICartItems,
    quantity = 1
  ) =>
  async (dispatch: Function) => {
    try {
      const existItem = cart.cartItems.find(
        (x: ICartItems) => x._id === product._id
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
        ? cart.cartItems.map((item: ICartItems) =>
            item._id === existItem._id ? newItem : item
          )
        : [...cart.cartItems, newItem];

      const totalQuantity = cartItems.reduce(
        (quantity, item) => quantity + item.quantity,
        0
      );

      Cookies.set("cartItems", JSON.stringify(cartItems));
      Cookies.set("totalCartQuantity", totalQuantity.toString());
      dispatch({
        type: CART_ADD_ITEM,
        payload: { cartItems, totalQuantity },
      });
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
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
    product: ICartItems
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

      Cookies.set("cartItems", JSON.stringify(cartItems));
      Cookies.set("totalCartQuantity", totalQuantity.toString());

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

export const addNewShippingInfo: Function =
  (info: {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
  }) =>
  async (dispatch: Function) => {
    try {
      const shippingAddress: IShippingAddress[] = Cookies.get("shippingAddress")
        ? JSON.parse(Cookies.get("shippingAddress"))
        : [];

      if (shippingAddress.length >= 3) {
        toast.error("You can only have a maximum of 3 shipping address", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }

      const { firstname, lastname, phoneNumber, address, city, state } = info;
      const modifiedAddress = {
        phoneNumber,
        address,
        city,
        state,
        fullName: `${lastname} ${firstname}`,
      };

      shippingAddress.push(modifiedAddress);
      const selectedAddress = shippingAddress.length - 1;

      Cookies.set("selectedAddress", JSON.stringify(selectedAddress));
      Cookies.set("shippingAddress", JSON.stringify(shippingAddress));

      dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: {
          address: shippingAddress,
          selected: selectedAddress,
        },
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

export const selectAddress: Function =
  (key: number) => async (dispatch: Function) => {
    try {
      Cookies.set("selectedAddress", JSON.stringify(key));
      dispatch({
        type: SELECT_SHIPPING_ADDRESS,
        payload: key,
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

export const removeAddress: Function =
  (key: number) => async (dispatch: Function) => {
    try {
      Cookies.set("selectedAddress", JSON.stringify(key));
      const shippingAddress: IShippingAddress[] = Cookies.get("shippingAddress")
        ? JSON.parse(Cookies.get("shippingAddress"))
        : [];

      const newshippingAddress = shippingAddress.filter(
        (_, index) => key !== index
      );
      const selectedAddress =
        newshippingAddress.length >= 1 ? newshippingAddress.length - 1 : null;

      Cookies.set("selectedAddress", JSON.stringify(selectedAddress));
      Cookies.set("shippingAddress", JSON.stringify(newshippingAddress));

      dispatch({
        type: REMOVE_SHIPPING_ADDRESS,
        payload: {
          address: shippingAddress,
          selected: selectedAddress,
        },
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

export const selectPaymentMethod: Function =
  (method: string) => async (dispatch: Function) => {
    try {
      Cookies.set("paymentMethod", method);
      dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: method,
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

export const applyCoupon: Function =
  (code: string) => async (dispatch: Function) => {
    try {
      const couponCodes = {
        AHUBB: 10,
        YELU: 5,
      };

      if (!Object.keys(couponCodes).includes(code)) {
        toast.error("Invalid coupon code", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }
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
