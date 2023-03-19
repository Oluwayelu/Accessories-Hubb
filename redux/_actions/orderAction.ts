import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getError } from "utils/error";
import {
  PLACE_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAIL,
  GET_ORDER_HISTORY,
} from "redux/types";

import type { IOrder } from "interface";

const API_URL = "/api/v1";

export const placeOrder: Function =
  (order: IOrder) => async (dispatch: Function) => {
    // console.log(Cookies.get("next-auth.session-token"));
    try {
      const { data } = await axios.post(`${API_URL}/orders`, order, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      window.location.href = `/dashboard/orders/${data._id}`;
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const getOrderHistory: Function = () => async (dispatch: Function) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const { data } = await axios.get(`${API_URL}/orders/history`, {
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    Cookies.set("orders-history", JSON.stringify(data));
    dispatch({
      type: GET_ORDER_HISTORY,
      payload: {
        orderItems: data,
        totalQuantity: data.length,
      },
    });
  } catch (err) {
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const getOrder: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: GET_ORDER_REQUEST });
      const { data } = await axios.get(`${API_URL}/orders/${id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
