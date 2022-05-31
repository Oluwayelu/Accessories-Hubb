import db from "database";
import nc from "next-connect";
import { User } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.status(200).send(users);
});

export default handler;
