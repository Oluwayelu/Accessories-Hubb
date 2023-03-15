import db from "database";
import nc from "next-connect";
import jwt from "jsonwebtoken";

import { User } from "models";
import { accountStatusEnum } from "utils/enums";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const { token } = req.query;
  if (token) {
    const decoded = await jwt.verify(token, process.env.NEXT_APP_JWT_SECRET);
    req.user = decoded;
  }

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.status = accountStatusEnum.ACTIVE;
    user.emailToken = undefined;
    await user.save();

    return res.status(200).json({
      message: "Email is now verified",
    });
  }
  db.disconnect();
});

export default handler;
