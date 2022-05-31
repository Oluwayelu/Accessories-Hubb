import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
} from "next";
import { ParsedUrlQuery } from "querystring";

export interface IAction {
  type: string;
  payload: any;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  firstname: string;
  lastname: string;
  middlename: string;
  password: string;
  phoneNumber: string;
  verified: string;
  isAdmin: string;
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

export type IGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>;
