import axios from "axios";
import { GET_ERROR, CLEAR_ERROR, LOADING, GET_CATEGORIES } from "redux/types";
import { getError } from "utils/error";

export const getCategories: Function = () => async (dispatch: Function) => {
  dispatch({ type: LOADING });

  try {
    const { data } = await axios.get(`api/v1/products/categories`);
    dispatch({ type: GET_CATEGORIES, payload: data });
    dispatch({ type: CLEAR_ERROR });
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


