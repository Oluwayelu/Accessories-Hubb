import { IAction } from "interface";
import Cookies from "js-cookie";
import { GET_CATEGORIES, GET_CATEGORIES_REQUEST, LOADING } from "../types";

const initialState = {
  loading: false,
  products: [],
  category: [],
};

const productReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
