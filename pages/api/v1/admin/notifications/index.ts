import db from "database";
import nc from "next-connect";
import { Notification } from "models";
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
  const notifications = await Notification.find({})
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

export default handler;
