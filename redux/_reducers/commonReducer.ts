import { CLEAR_ERROR, GET_ERROR, LOADING } from "redux/types";
import { IAction } from "interface";

export const loadingReducer = (state = false, action: IAction) => {
  switch (action.type) {
    case LOADING:
      return !state;
    default:
      return state;
  }
};

export const errorReducer = (state = null, action: IAction) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};
