import db from "database";
import nc from "next-connect";
import { Order } from "models";
import { onError } from "utils/error";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const orders = await Order.find({}).populate("user", "name");
  await db.disconnect();
  res.status(200).send(orders);
});

export default handler;
