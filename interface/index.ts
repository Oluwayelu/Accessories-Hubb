import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
} from "next";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { ParsedUrlQuery } from "querystring";
import { makestore } from "redux/store";

export interface IAction {
  type: string;
  payload: any;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  imgUrl: string;
  firstname: string;
  lastname: string;
  middlename: string;
  password: string;
  phoneNumber: string;
  verified: string;
  isAdmin: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

export interface IReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
}

export interface IProduct {
  _id: string;
  user: string;
  name: string;
  slug: string;
  category: string;
  image: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  reviews: IReview;
  featuredImage: string;
  isFeatured: boolean;
}

export interface ICartItems {
  _id: string;
  user: string;
  name: string;
  slug: string;
  category: string;
  image: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  reviews: IReview;
  featuredImage: string;
  isFeatured: boolean;
  quantity: number;
}

export interface IState {
  user: {
    userInfo: IUser;
  };
  product: {
    products: IProduct[];
    category: IProduct[];
  };
  cart: {
    totalQuantity: number;
    cartItems: ICartItems[];
    shippingAddress: {
      location: {};
    };
    paymentMethod: string;
  };
  error: string;
  loading: boolean;
}

export interface INextApiRequest extends NextApiRequest {
  user: IUser;
}

export type SendEmailOptions = {
  email: string;
  subject: string;
  message: string;
};

export type IGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>;

export type AppStore = ReturnType<typeof makestore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;
