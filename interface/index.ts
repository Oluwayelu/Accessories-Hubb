import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
} from "next";
import { ChangeEventHandler } from "react";
import { ParsedUrlQuery } from "querystring";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";

import { makestore } from "redux/store";

import type { IconType } from "react-icons/lib";

export interface IAction {
  type: string;
  payload: any;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  imgUrl: string;
  refId?: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  password: string;
  source: string;
  status: string;
  gender: string;
  referees?: string[];
  phoneNumber: string;
  isAdmin: string;
  lastVisited: Date;
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
  _id?: string;
  name: string;
  slug: string;
  category: string;
  image: string[];
  price: number;
  oldPrice?: number;
  brand: string;
  rating: number;
  numReviews?: number;
  countInStock: number;
  description: string;
  reviews?: IReview;
  featuredImage?: string;
  isFeatured?: boolean;
}

export interface ICartItems extends IProduct {
  quantity: number;
}

export interface IBanner {
  image: string;
  title: string;
  buttonText: string;
  description: string;
  discount?: number;
  saleTime?: number;
  color?: string;
}

export interface IShippingAddress {
  firstname?: string;
  lastname?: string;
  fullName?: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  selected?: boolean;
  country?: string;
  location?: {
    lat: string;
    lng: string;
    address: string;
    name: string;
    vicinity: string;
    googleAddressId: string;
  };
}

type OrderItems = {
  name: string;
  quantity: number;
  image: string[];
  price: number;
};

export interface IOrder {
  _id?: string;
  user?: IUser;
  orderItems: OrderItems[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    emailAddress: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  status: string;
  paidAt?: Date;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICoupon {
  _id: string;
  title: string;
  discount: number;
  saleTime: Date;
}

type SalesData = {
  _id: string;
  totalSales: number;
};
export interface ISummary {
  orders: IOrder[];
  completedOrder: IOrder[];
  ordersCount: number;
  ordersPrice: number;
  productsCount: number;
  salesData: SalesData[];
  usersCount: number;
}

export interface INotification {
  _id: string;
  user: IUser;
  note: {
    title: string;
    description: string;
  };
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IState {
  auth: { loading: boolean; userInfo: IUser };
  user: {
    loading: boolean;
    user: IUser;
    users: IUser[];
    admins: IUser[];
    customers: IUser[];
  };
  admin: { loading: boolean; summary: ISummary; error: string };
  notification: {
    unread: number;
    loading: boolean;
    notifications: INotification[];
  };
  product: {
    loading: boolean;
    product: IProduct;
    products: IProduct[];
    category: IProduct[];
  };
  coupon: {
    loading: boolean;
    coupons: ICoupon[];
  };
  upload: {
    loading: boolean;
    images: string[];
  };
  order: {
    loading: boolean;
    totalQuantity: number;
    orderItems: IOrder[];
    currOrder: IOrder;
  };
  cart: {
    loading: boolean;
    totalQuantity: number;
    selectedAddress: number;
    cartItems: ICartItems[];
    shippingAddress: IShippingAddress[];
    paymentMethod: string;
  };
  favourite: { loading: boolean; products: IProduct[] };
  error: string;
  loading: boolean;
}

type SidebarDropdown = {
  name: string;
  link: string;
  Icon: IconType;
};
export interface ISidebarRoutes {
  name: string;
  link?: string;
  Icon: IconType;
  dropdown?: SidebarDropdown[];
}

export interface INextApiRequest extends NextApiRequest {
  file: any;
  user: IUser;
}

export type SendEmailOptions = {
  email: string;
  subject: string;
  message: string;
};

export type IHandleChange = ChangeEventHandler<HTMLInputElement>;

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
