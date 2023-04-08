import nc from "next-connect";
import db from "database";
import { Notification } from "models";
import { isAuth } from "utils/auth";
import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  const notifications = await Notification.find({ user: req.user._id })
    .populate("user", ["name", "imgUrl"])
    .lean()
    .sort({
      createdAt: -1,
    });

  const unread = notifications.filter((n) => {
    return !n.readBy.includes(req.user._id);
  }).length;

  await db.disconnect();
  res.status(200).json({
    notifications,
    unread,
  });
});

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const newNotification = new Notification({
    ...req.body,
    user: req.user._id,
  });
  const notification = await newNotification.save();
  await db.disconnect();

  res.status(200).json({ message: "Notification sent", notification });
});

export default handler;
