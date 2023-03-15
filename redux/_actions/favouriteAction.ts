import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  GET_ERROR,
  CLEAR_ERROR,
  ADD_TO_FAVOURITE,
  REMOVE_ITEM_FROM_FAVOURITES,
} from "redux/types";
import { getError } from "utils/error";

import type { IProduct } from "interface";

export const addToFavourite: Function =
  (favourite: { products: IProduct[] }, product: IProduct) =>
  async (dispatch: Function) => {
    try {
      const existItem = isFavourite(favourite, product);

      const favouriteItems = !existItem && [...favourite.products, product];
      Cookies.set("favouriteProducts", JSON.stringify(favouriteItems));
      dispatch({
        type: ADD_TO_FAVOURITE,
        payload: favouriteItems,
      });
      toast.success("Product added to Favourites", {
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

export const removeFavourite: Function =
  (favourite: { products: IProduct[] }, product: IProduct) =>
  async (dispatch: Function) => {
    try {
      const favouriteItems = favourite.products.filter(
        (item) => item._id !== product._id
      );
      Cookies.set("favouriteProducts", JSON.stringify(favouriteItems));
      dispatch({
        type: REMOVE_ITEM_FROM_FAVOURITES,
        payload: favouriteItems,
      });
      toast.success("Product removed from Favourites", {
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

export const isFavourite = (
  favourite: { products: IProduct[] },
  product: IProduct
) => {
  try {
    const existItem = favourite.products.find(
      (x: IProduct) => x._id === product._id
    );

    return existItem;
  } catch (err) {
    return false;
  }
};
