import axios from "axios";
import { IUser } from "interface";
import {
  USER_INFO,
  GET_ERROR,
  CLEAR_ERROR,
  LOADING,
  LOGOUT_USER,
} from "redux/types";
import { signIn, signOut, SignInResponse } from "next-auth/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getError } from "utils/error";

type Login = {
  email: string;
  password: string;
};

const API_URL = "/api/v1";

export const loginUser: Function =
  ({ email, password }: Login, callbackUrl: string) =>
  async (dispatch: Function) => {
    dispatch({ type: LOADING });
    try {
      const res = (await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      })) as unknown as SignInResponse;

      if (res?.error) {
        toast.error(res.error, {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
        });
      }

      dispatch({ type: LOADING, payload: false });
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };

export const registerUser: Function =
  ({ email, firstname, lastname, password }: IUser) =>
  async (dispatch: Function) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        email,
        firstname,
        lastname,
        password,
      });
      dispatch({ type: USER_INFO, payload: data.user });
      Cookies.set("token", data.token);
      Cookies.set("userInfo", JSON.stringify(data.user));
      dispatch({ type: LOADING, payload: false });
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };

export const forgotPassword: Function = (email: string) => async () => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/password/forgot`, {
      email,
    });
    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });

      console.log(data.url);
    }
  } catch (err) {
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
    } catch (err) {
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
