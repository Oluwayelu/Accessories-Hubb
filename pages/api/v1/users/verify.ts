import nc from "next-connect";
import db from "database";
import { User } from "models";
import { isAuth } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.user._id);

  if (!user.verified) {
    user.verified = true;
  }
  await user.save();
  await db.disconnect();

  res.status(200).json({
    message: "user verified",
  });
});

export default handler;
