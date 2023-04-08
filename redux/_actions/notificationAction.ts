import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  GET_NOTIFICATION,
  READ_NOTIFICATION,
  NOTIFICATION_FAILED,
  NOTIFICATION_REQUEST,
} from "redux/types";
import { getError } from "utils/error";

const API_URL = "/api/v1";

export const getNotificationUser: Function =
  () => async (dispatch: Function) => {
    try {
      dispatch({ type: NOTIFICATION_REQUEST });
      const { data } = await axios.get(`${API_URL}/notifications`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      dispatch({ type: GET_NOTIFICATION, payload: data });
    } catch (err) {
      dispatch({ type: NOTIFICATION_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const getNotificationAdmin: Function =
  () => async (dispatch: Function) => {
    try {
      dispatch({ type: NOTIFICATION_REQUEST });
      const { data } = await axios.get(`${API_URL}/admin/notifications`, {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      dispatch({ type: GET_NOTIFICATION, payload: data });
    } catch (err) {
      dispatch({ type: NOTIFICATION_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const readNotificationUser: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/notifications/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch({ type: READ_NOTIFICATION, payload: data });
    } catch (err) {
      dispatch({ type: NOTIFICATION_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const readNotificationAdmin: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/admin/notifications/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      dispatch({ type: READ_NOTIFICATION, payload: data });
    } catch (err) {
      dispatch({ type: NOTIFICATION_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
