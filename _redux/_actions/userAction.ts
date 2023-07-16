import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "interface";
import { toast } from "react-toastify";

import { getError } from "utils/error";
import {
  USER_INFO_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
  USER_REQUEST,
  GET_USERS,
  GET_USER,
  USER_FAILED,
} from "_redux/types";

const API_URL = "/api/v1";

export const getUsers: Function = () => async (dispatch: Function) => {
  try {
    dispatch({ type: USER_REQUEST });
    const { data } = await axios.get(`${API_URL}/admin/users`, {
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    dispatch({ type: GET_USERS, payload: data });
  } catch (err) {
    dispatch({ type: USER_INFO_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const getUser: Function = (id: string) => async (dispatch: Function) => {
  try {
    dispatch({ type: USER_REQUEST });
    const { data } = await axios.get(`${API_URL}/admin/users/${id}`, {
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

    dispatch({ type: GET_USER });
  } catch (err) {
    dispatch({ type: USER_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const makeAdmin: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: USER_REQUEST });
      const { data } = await axios.put(
        `${API_URL}/admin/users/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });

      dispatch({ type: GET_USERS, payload: data.users });
    } catch (err) {
      dispatch({ type: USER_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

export const deleteUser: Function =
  (id: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: USER_REQUEST });
      const { data } = await axios.delete(`${API_URL}/admin/users/${id}`, {
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

      dispatch({ type: GET_USERS, payload: data.users });
    } catch (err) {
      dispatch({ type: USER_FAILED });
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };
