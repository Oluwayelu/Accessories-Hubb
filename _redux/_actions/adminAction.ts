import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  GET_DASHBOARD_SUMMARY_FAILED,
  GET_DASHBOARD_SUMMARY_REQUEST,
  GET_DASHBOARD_SUMMARY_SUCCESS,
} from "_redux/types";
import { getError } from "utils/error";

export const getDashboardSummary = () => async (dispatch: Function) => {
  try {
    dispatch({ type: GET_DASHBOARD_SUMMARY_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/summary`, {
      headers: { authorization: `Bearer ${Cookies.get("token")}` },
    });

    Cookies.set("admin-summary", JSON.stringify(data));
    dispatch({ type: GET_DASHBOARD_SUMMARY_SUCCESS, payload: data });
  } catch (err) {
    const error = getError(err);
    dispatch({ type: GET_DASHBOARD_SUMMARY_FAILED, payload: error });
    toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};
