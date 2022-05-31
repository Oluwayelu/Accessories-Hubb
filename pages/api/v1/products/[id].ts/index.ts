import nc from "next-connect";
import db from "database";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();

  res.status(200).send(product);
});

export default handler;
