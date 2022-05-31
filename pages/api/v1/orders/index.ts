import nc from "next-connect";
import db from "database";
import { Order } from "models";
import { isAuth } from "utils/auth";
import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

export default handler;
