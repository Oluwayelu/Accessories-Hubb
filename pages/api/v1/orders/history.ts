import nc from "next-connect";
import db from "database";
import { Order } from "models";
import { isAuth } from "utils/auth";
import { onError } from "utils/error";
import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id }).lean().sort({
    createdAt: -1,
  });
  res.status(200).send(orders);
});

export default handler;
