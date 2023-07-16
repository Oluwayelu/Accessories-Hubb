import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getError } from "utils/error";
import { DELETE_UPLOAD, REMOVE_SUCCESS, UPLOAD_FAILED, UPLOAD_REQUEST, UPLOAD_SUCCESS } from "_redux/types";

export const upload: Function = (file: Blob) => async (dispatch: Function) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    dispatch({ type: UPLOAD_REQUEST });
    const { data } = await axios.post("/api/v1/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    dispatch({ type: UPLOAD_SUCCESS, payload: data.urlPath });
  } catch (err) {
    dispatch({ type: UPLOAD_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
};

export const deleteFile: Function = (url: string) => async (dispatch: Function) => {
  try {
    // dispatch({ type: UPLOAD_REQUEST });
    const { data } = await axios.post(
      `/api/v1/file/`,
      { url },
      {
        headers: {
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    dispatch({ type: DELETE_UPLOAD, payload: url });
  } catch (err) {
    dispatch({ type: UPLOAD_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
}

export const remove: Function = (url: string) => async (dispatch: Function) => {
  try {
    // dispatch({ type: UPLOAD_REQUEST });


    dispatch({ type: REMOVE_SUCCESS, payload: url });
  } catch (err) {
    dispatch({ type: UPLOAD_FAILED });
    toast.error(getError(err), {
      position: "bottom-left",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  }
}