import db from "database";
import nc from "next-connect";
import { Product } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse, NextApiRequest } from "next";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({}).lean().sort({
    createdAt: -1,
  });
  await db.disconnect();
  res.status(200).send(products);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, image, price, oldPrice, category, brand, countInStock, description } =
    req.body;

  const slug =
    name
      .split(" ")
      .map((s: string) => s.toLowerCase())
      .join("-") +
    "-" +
    Math.round(Math.random() * 10000).toString();

  await db.connect();
  const newProduct = new Product({
    name,
    slug,
    image,
    price,
    oldPrice,
    category,
    brand,
    countInStock,
    description,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.status(200).json({ message: "Product Created", product });
});

export default handler;
