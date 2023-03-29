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
  const coupon = await Coupon.findById(req.query.id);
  await db.disconnect();
  res.status(200).send(coupon);
});

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const coupon = await Coupon.findById(req.query.id);

  coupon.title = req.body.title;
  coupon.discount = req.body.discount;
  coupon.saleTime = req.body.saleTime;

  await coupon.save();
  await db.disconnect();
  res.status(200).json({ message: "Coupon updated", coupon });
});

handler.delete(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const coupon = await Coupon.findById(req.query.id);
  if (coupon) {
    await coupon.remove();
    const coupons = await Coupon.find();
    await db.disconnect();
    res.status(200).json({ message: "Coupon Deleted", coupons });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Coupon Not Found" });
  }
});

export default handler;
