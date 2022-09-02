import jwt from "jsonwebtoken";

import type { NextApiResponse } from "next";
import type { IUser, INextApiRequest } from "interface";

const signToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      lastname: user.firstname,
      firstname: user.firstname,
      middlename: user.middlename,
    },

    process.env.NEXT_APP_JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = async (
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
    res.status(401).send({ message: "Token is not suppiled" });
  }
};
const isAdmin = async (
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

export { signToken, isAuth, isAdmin };
