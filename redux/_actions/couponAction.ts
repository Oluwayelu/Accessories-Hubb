import axios from "axios";
import { IProduct } from "interface";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { GET_COUPON_FAILED, GET_COUPON_REQUEST } from "redux/types";

import { getError } from "utils/error";

export const applyCoupon: Function =
  (title: string, totalPrice: number) => async (dispatch: Function) => {
    try {
      dispatch({ type: GET_COUPON_REQUEST });
      const { data } = await axios.get(`/api/v1/products/${title}`);
      console.log(data);
    } catch (err) {
      dispatch({ type: GET_COUPON_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
