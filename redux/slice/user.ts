import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "redux/store";

import Cookies from "js-cookie";
import { IAction, IUser } from "interface";

import { USER_INFO, LOGOUT_USER } from "../types";

export interface IAuthState {
  userInfo?: IUser | {};
}

const initialState: IAuthState = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

// export const register = createAsyncThunk('auth/register', async({name, email, password}, thunkAPI) => {
// try {
//   const res
//   thunkAPI.dispatch()
//   return true
// }
// })

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUser(state, action) {
      state.userInfo = action.payload;
    },

    logoutUser(state, action) {
      state.userInfo = {};
    },

    // loginUser(state, action) {},

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.user;

export default authSlice.reducer;
