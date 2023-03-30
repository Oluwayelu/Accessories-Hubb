import jwt from "jsonwebtoken";

import { LOGIN } from "routes";

import type { NextApiResponse } from "next";
import type { IUser, INextApiRequest } from "interface";

export const signToken = (user: Partial<IUser>) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.NEXT_APP_JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const auth = ({
  token,
  redirect,
  props = {},
  admin = false,
}: {
  props?: any;
  token: string;
  admin?: boolean;
  redirect?: string;
}) => {
  return jwt.verify(
    token,
    process.env.NEXT_APP_JWT_SECRET,
    (err: any, decode: IUser) => {
      if (err) {
        return {
          redirect: {
            destination: LOGIN + `?redirect=${redirect ? redirect : "/"}`,
            permanent: false,
          },
        };
      } else {
        if (admin && !decode.isAdmin) {
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
        return {
          props,
        };
      }
    }
  );
};

export const isAuth = async (
  req: INextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.NEXT_APP_JWT_SECRET,
      (err: any, decode: IUser) => {
        if (err) {
          res.status(401).send({ message: "Token is not valid" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "You are not authenticated!" });
  }
};
export const isAdmin = async (
  req: INextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "User is not admin" });
  }
};
