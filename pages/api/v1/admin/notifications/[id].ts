import nc from "next-connect";
import db from "database";
import { Notification } from "models";
import { isAdmin, isAuth } from "utils/auth";
import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const notifications = await Notification.findById(req.query.id).populate(
    "user",
    ["name", "imgUrl"]
  );
  await db.disconnect();
  res.status(200).send(notifications);
});

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const notification = await Notification.findById(req.query.id);

  if (notification) {
    if (!notification.readBy.includes(req.user._id)) {
      notification.readBy.push(req.user._id);
    }
    await notification.save();

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
    res
      .status(200)
      .json({ message: "Notification updated", unread, notifications });
  } else {
    await db.disconnect();
    res.status(400).json({ message: "Failed to update notification" });
  }
});

export default handler;
