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
  const coupon = await Coupon.find();
  await db.disconnect();
  res.status(200).send(coupon);
});

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const { title, discount, saleTime } = req.body;
  const newCoupon = new Coupon({
    title,
    discount,
    saleTime,
  });

  const coupon = await newCoupon.save();
  await db.disconnect();
  res.status(200).json({ message: "Coupon Created", coupon });
});

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const coupon = await Coupon.findById(req.body.id);

  coupon.title = req.body.title;
  coupon.discount = req.body.discount;
  coupon.saleTime = req.body.saleTime;

  await coupon.save();
  await db.disconnect();
  res.status(200).json({ message: "Coupon updated", coupon });
});

export default handler;
