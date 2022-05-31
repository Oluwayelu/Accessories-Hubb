import nc from "next-connect";
import db from "database";
import { Order } from "models";
import { isAuth } from "utils/auth";
import { onError } from "utils/error";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.status(200).json({ message: "order delivered", order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).json({ message: "order not found" });
  }
});

export default handler;
