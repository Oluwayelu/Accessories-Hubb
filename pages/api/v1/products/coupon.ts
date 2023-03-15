import db from "database";
import nc from "next-connect";
import { Coupon } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const coupon = await Coupon.find({ title: req.query.title });
  await db.disconnect();
  res.status(200).send(coupon);
});

export default handler;
