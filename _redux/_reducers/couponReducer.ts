import Cookies from "js-cookie";
import { IAction } from "interface";

import {
  COUPON_FAILED,
  COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON_SUCCESS,
  GET_COUPON_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  coupons: [],
};

const couponReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case COUPON_REQUEST:
      return { ...state, loading: true };

    case GET_COUPON_SUCCESS:
      return { ...state, loading: false, coupons: payload };

    case CREATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: [...state.coupons, payload],
      };

    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: payload,
      };

    case COUPON_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default couponReducer;
