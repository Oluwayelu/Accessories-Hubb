import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getError } from "utils/error";
import {
  COUPON_FAILED,
  COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON_SUCCESS,
  GET_COUPON_SUCCESS,
} from "_redux/types";

import type { ICoupon } from "interface";

export const applyCoupon: Function =
  (title: string, totalPrice: number) => async (dispatch: Function) => {
    try {
      dispatch({ type: COUPON_REQUEST });
      const { data } = await axios.get(`/api/v1/products/coupon/${title}`);
      console.log(data);
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const getCoupons: Function = () => async (dispatch: Function) => {
  try {
    dispatch({ type: COUPON_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/products/coupon`, {
      headers: { authorization: `Bearer ${Cookies.get("token")}` },
    });

    dispatch({ type: GET_COUPON_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: COUPON_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const createCoupon: Function =
  (value: Partial<ICoupon>) => async (dispatch: Function) => {
    try {
      dispatch({ type: COUPON_REQUEST });
      const { data } = await axios.post(
        `/api/v1/admin/products/coupon`,
        value,
        {
          headers: { authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: CREATE_COUPON_SUCCESS, payload: data.coupon });
    } catch (err) {
      dispatch({ type: COUPON_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const editCoupon: Function =
  (id: string, value: Partial<ICoupon>) => async (dispatch: Function) => {
    try {
      dispatch({ type: COUPON_REQUEST });
      const { data } = await axios.put(`/api/v1/admin/coupon/${id}`, value, {
        headers: { authorization: `Bearer ${Cookies.get("token")}` },
      });

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: CREATE_COUPON_SUCCESS, payload: data.coupon });
    } catch (err) {
      dispatch({ type: COUPON_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const deleteCoupon: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: COUPON_REQUEST });
      const { data } = await axios.delete(`/api/v1/admin/coupon/${id}`, {
        headers: { authorization: `Bearer ${Cookies.get("token")}` },
      });

      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: DELETE_COUPON_SUCCESS, payload: data.coupons });
    } catch (err) {
      dispatch({ type: COUPON_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
