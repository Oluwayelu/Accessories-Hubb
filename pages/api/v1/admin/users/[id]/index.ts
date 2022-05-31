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
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.status(200).send(user);
});

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();
    await db.disconnect();
    res.status(200).json({ message: "User Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).json({ message: "User Not Found" });
  }
});

handler.delete(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.remove();
    await db.disconnect();
    res.status(200).json({ message: "User Deleted" });
  } else {
    await db.disconnect();
    res.status(404).json({ message: "User Not Found" });
  }
});

export default handler;
