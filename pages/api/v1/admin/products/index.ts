import db from "database";
import nc from "next-connect";
import { Product } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.status(200).send(products);
});

handler.post(async (req, res: NextApiResponse) => {
  await db.connect();
  const newProduct = new Product({
    name: "sample name",
    slug: "sample-slug-" + Math.random(),
    image: "/images/shirt1.jpg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    countInStock: 0,
    description: "sample description",
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.status(200).json({ message: "Product Created", product });
});

export default handler;
