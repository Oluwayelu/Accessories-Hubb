import nc from "next-connect";
import db from "database";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const products = [];

  const categories = await Product.find().distinct("category");
  for (var i = 0; i < categories.length; i++) {
    const productDocs = await Product.find(
      {
        category: categories[i],
      },
      "-review"
    );

    products.push(productDocs[0]);
  }
  await db.disconnect();

  res.status(200).send(products);
});

export default handler;
