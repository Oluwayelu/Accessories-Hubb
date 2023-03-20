import db from "database";
import nc from "next-connect";
import { Product, Order, User } from "models";
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
  const orders = await Order.find({})
    .populate("user", ["name", "imgUrl"])
    .lean()
    .sort({
      createdAt: -1,
    });
  const completedOrder = await Order.find({ status: "Completed" })
    .populate("user", ["name", "imgUrl"])
    .lean()
    .sort({
      createdAt: -1,
    });
  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);
  await db.disconnect();
  res.status(200).json({
    orders,
    ordersCount,
    completedOrder,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
  });
});

export default handler;
