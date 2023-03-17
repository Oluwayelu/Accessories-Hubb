import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "interface";
import { toast } from "react-toastify";
import { signIn, signOut, SignInResponse } from "next-auth/react";

import { getError } from "utils/error";
import {
  USER_INFO_SUCCESS,
  LOGOUT_USER,
  USER_INFO_REQUEST,
  USER_INFO_FAILED,
} from "redux/types";

type Login = {
  email: string;
  password: string;
};

const API_URL = "/api/v1";

export const loginUser: Function =
  ({ email, password }: Login) =>
  async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (data) {
        const res = (await signIn("credentials", {
          email,
          password,
          redirect: true,
        })) as unknown as SignInResponse;

        if (res?.error) {
          toast.error(res.error, {
            position: "bottom-left",
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
          });
        }
      }
      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
      Cookies.set("token", data.token);
      Cookies.set("userInfo", JSON.stringify(data.user));
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

export const registerUser: Function =
  ({ email, firstname, lastname, password, refId }: IUser) =>
  async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        refId,
        email,
        firstname,
        lastname,
        password,
      });
      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
      console.log(data.verifyLink);
      Cookies.set("token", data.token);
      Cookies.set("userInfo", JSON.stringify(data.user));
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

export const forgotPassword: Function =
  (email: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.post(`${API_URL}/auth/password/forgot`, {
        email,
      });
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });

      console.log(data.url);
      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
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

export const resetPassword: Function =
  (password: string, confirmPassword: string, token: string) =>
  async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.put(
        `${API_URL}/auth/password/reset/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
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

export const logoutUser: Function = () => async (dispatch: Function) => {
  try {
    signOut();
    dispatch({ type: LOGOUT_USER });
    Cookies.remove("token");
    Cookies.remove("userInfo");
  } catch (err) {
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const updateProfile: Function =
  (details: IUser) => async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.put(`${API_URL}/users/profile`, details, {
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

      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
      Cookies.set("token", data.token);
      Cookies.set("userInfo", JSON.stringify(data.user));
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

export const updatePassword: Function =
  (password: string) => async (dispatch: Function) => {
    try {
      dispatch({ type: USER_INFO_REQUEST });
      const { data } = await axios.put(
        `${API_URL}/users/password`,
        { password },
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

      dispatch({ type: USER_INFO_SUCCESS, payload: data.user });
      Cookies.set("token", data.token);
      Cookies.set("userInfo", JSON.stringify(data.user));
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
