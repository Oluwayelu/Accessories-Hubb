import nc from "next-connect";
import db from "database";
import { isAuth } from "utils/auth";
import { Order, Notification } from "models";
import { newOrderNote } from "utils/notes";

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
  const newNotification = new Notification({
    user: req.user._id,
    note: newOrderNote(),
  });
  const order = await newOrder.save();
  await newNotification.save();
  res.status(201).send(order);
});

export default handler;
