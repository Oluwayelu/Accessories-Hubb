import Cookies from "js-cookie";
import { ADD_TO_FAVOURITE, REMOVE_ITEM_FROM_FAVOURITES } from "redux/types";

import type { IAction } from "interface";

const initialState = {
  products: Cookies.get("favouriteProducts")
    ? JSON.parse(Cookies.get("favouriteProducts"))
    : [],
};

const favouriteReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case ADD_TO_FAVOURITE:
      return { ...state, products: payload };

    case REMOVE_ITEM_FROM_FAVOURITES:
      return { ...state, products: payload };

    default:
      return state;
  }
};

export default favouriteReducer;
