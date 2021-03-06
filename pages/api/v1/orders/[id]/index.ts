import nc from "next-connect";
import db from "database";
import { Order } from "models";
import { isAuth } from "utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(isAuth);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.status(200).send(order);
});

export default handler;
