import db from "database";
import nc from "next-connect";
import { Product } from "models";
import { isAuth, isAdmin } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.status(200).send(product);
});

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.oldPrice = req.body.oldPrice;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.status(200).json({ message: "Product Updated Successfully", product });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }
});

handler.delete(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.status(200).json({ message: "Product Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
