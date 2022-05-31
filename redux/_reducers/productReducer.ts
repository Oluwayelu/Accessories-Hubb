import { IAction } from "interface";
import Cookies from "js-cookie";
import { GET_CATEGORIES, LOADING } from "../types";

const initialState = {
  products: [],
  category: [],
};

const productReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
