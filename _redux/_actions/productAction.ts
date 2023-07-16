import axios from "axios";
import Cookies from "js-cookie";
import { IProduct } from "interface";
import { toast } from "react-toastify";

import {
  GET_ERROR,
  CLEAR_ERROR,
  GET_CATEGORIES,
  GET_CATEGORIES_REQUEST,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_FAILED,
  ADD_NEW_PRODUCT_SUCCESS,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
} from "_redux/types";
import { getError } from "utils/error";

export const getCategories: Function = () => async (dispatch: Function) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    const { data } = await axios.get(`/api/v1/products/categories`);
    dispatch({ type: GET_CATEGORIES, payload: data });
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

export const addNewProduct: Function =
  (product: Partial<IProduct>) => async (dispatch: Function) => {
    try {
      dispatch({ type: ADD_NEW_PRODUCT_REQUEST });
      const { data } = await axios.post("/api/v1/admin/products", product, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: ADD_NEW_PRODUCT_SUCCESS, payload: data.product });
    } catch (err) {
      dispatch({ type: ADD_NEW_PRODUCT_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const getProducts: Function = () => async (dispatch: Function) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products", {
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_PRODUCTS_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const getProduct: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: GET_PRODUCT_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/products/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_PRODUCT_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const updateProduct: Function =
  (id: string, product: Partial<IProduct>) => async (dispatch: Function) => {
    try {
      dispatch({ type: GET_PRODUCT_REQUEST });
      const { data } = await axios.put(
        `/api/v1/admin/products/${id}`,
        product,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });

      dispatch({ type: GET_PRODUCT_SUCCESS, payload: data.product });
    } catch (err) {
      dispatch({ type: GET_PRODUCT_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const deleteProduct: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: GET_PRODUCT_REQUEST });
      const { data } = await axios.delete(`/api/v1/admin/products/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      window.location.href = "/admin/products";
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: {} });
    } catch (err) {
      dispatch({ type: GET_PRODUCT_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
