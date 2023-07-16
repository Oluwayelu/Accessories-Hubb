import Cookies from "js-cookie";
import { IAction, IUser } from "interface";

import { DELETE_UPLOAD, REMOVE_SUCCESS, UPLOAD_FAILED, UPLOAD_REQUEST, UPLOAD_SUCCESS } from "../types";

const initialState = {
  loading: false,
  images: [
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
    // "/uploads/1681581480973-fashion-shoes-sneakers.jpg",
  ],
};

const uploadReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case UPLOAD_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_FAILED:
      return {
        ...state,
        loading: false,
      };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [payload, ...state.images],
      };

    case DELETE_UPLOAD:
      const images = state.images.filter((image) => image !== payload)
      
      return {
        ...state,
        images,
        loading: false,
      };

    case REMOVE_SUCCESS:
      const newImages = state.images.filter((image) => image !== payload)
      
      return {
        ...state,
        images: newImages,
        loading: false,
      };

    default:
      return state;
  }
};

export default uploadReducer;
