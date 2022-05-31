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
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.status(200).json({ message: "order paid", order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).json({ message: "order not found" });
  }
});

export default handler;
