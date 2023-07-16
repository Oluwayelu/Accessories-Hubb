import { IAction } from "interface";
import {
  ADD_NEW_PRODUCT_FAILED,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_REQUEST,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
} from "../types";

const initialState = {
  loading: false,
  products: [],
  category: [],
};

const productReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        category: payload,
      };

    case ADD_NEW_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case ADD_NEW_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: payload };

    case ADD_NEW_PRODUCT_FAILED:
      return { ...state, loading: false };

    case GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: payload };

    case GET_PRODUCTS_FAILED:
      return { ...state, loading: false };

    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case GET_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: payload };

    case GET_PRODUCT_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default productReducer;
