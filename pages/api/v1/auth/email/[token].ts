import nc from "next-connect";
import db from "database";
import jwt from "jsonwebtoken";
import { User } from "models";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
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
    (user.verified = true), (user.emailToken = undefined);
    await user.save();

    return res.status(200).json({
      message: "Email is now verified",
    });
  }
  db.disconnect();
});

export default handler;
