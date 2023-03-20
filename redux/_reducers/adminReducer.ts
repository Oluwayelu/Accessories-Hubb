import Cookies from "js-cookie";
import { IAction } from "interface";

import {
  GET_DASHBOARD_SUMMARY_FAILED,
  GET_DASHBOARD_SUMMARY_REQUEST,
  GET_DASHBOARD_SUMMARY_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  summary: Cookies.get("admin-summary")
    ? JSON.parse(Cookies.get("admin-summary"))
    : {},
  error: null,
};

const adminReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_DASHBOARD_SUMMARY_REQUEST:
      return { ...state, loading: true };

    case GET_DASHBOARD_SUMMARY_SUCCESS:
      return { ...state, loading: false, summary: payload };

    case GET_DASHBOARD_SUMMARY_FAILED:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default adminReducer;
