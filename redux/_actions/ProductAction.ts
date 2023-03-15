import axios from "axios";
import {
  GET_ERROR,
  CLEAR_ERROR,
  GET_CATEGORIES,
  GET_CATEGORIES_REQUEST,
} from "redux/types";
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
