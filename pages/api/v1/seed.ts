import nc from "next-connect";
import db from "database";
import { User, Product, Banner } from "models";
import { users, products, banners } from "utils/data";
import type { NextApiResponse } from "next";

const handler = nc();

type Data = {
  message: string;
};

handler.get(async (req, res: NextApiResponse<Data>) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(users);
  await Product.deleteMany();
  await Product.insertMany(products);
  await Banner.deleteMany();
  await Banner.insertMany(banners);
  await db.disconnect();
  res.status(200).json({ message: "seeded successfully" });
});

export default handler;
