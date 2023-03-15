import db from "database";
import nc from "next-connect";
import { Coupon } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const coupon = await Coupon.find({ title: req.query.title });
  await db.disconnect();
  res.status(200).send(coupon);
});

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const { title, discount } = req.body;
  const newCoupon = new Coupon({
    title,
    discount,
  });

  const coupon = await newCoupon.save();
  await db.disconnect();
  res.status(200).json({ message: "Coupon Created", coupon });
});

export default handler;
