import axios from "axios";
import { IUser } from "interface";
import { USER_INFO, GET_ERROR, CLEAR_ERROR, LOADING } from "redux/types";

import { nextLocalStorage } from "utils";
import { getError } from "utils/error";

type Login = {
  email: string;
  password: string;
};

const API_URL = process.env.API_URL;

export const loginUser: Function =
  ({ email, password }: Login) =>
  async (dispatch: Function) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      dispatch({ type: USER_INFO, payload: data });
      nextLocalStorage()?.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: CLEAR_ERROR });
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: getError(err),
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 5000);
    }
  };

export const registerUser: Function =
  ({ email, firstname, lastname, password }: IUser) =>
  async (dispatch: Function) => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, {
        email,
        firstname,
        lastname,
        password,
      });

      dispatch({ type: USER_INFO, payload: data });
      nextLocalStorage()?.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: CLEAR_ERROR });
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: getError(err),
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 5000);
    }
  };
