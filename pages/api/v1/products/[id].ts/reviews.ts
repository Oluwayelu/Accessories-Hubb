import db from "database";
import nc from "next-connect";
import mongoose from "mongoose";
import { Product } from "models";
import { isAuth } from "utils/auth";
import { onError } from "utils/error";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IProduct, INextApiRequest } from "interface";

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  if (product) {
    res.send(product.reviews);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    const existReview = product.reviews.find(
      (x: IProduct) => x.reviews?.user == req.user._id
    );
    if (existReview) {
      await Product.updateOne(
        { _id: req.query.id, "reviews._id": existReview._id },
        {
          $set: {
            "reviews.$.comment": req.body.comment,
            "reviews.$.rating": Number(req.body.rating),
          },
        }
      );

      const updatedProduct = await Product.findById(req.query.id);
      updatedProduct.numReviews = updatedProduct.reviews.length;
      updatedProduct.rating =
        updatedProduct.reviews.reduce(
          (a: number, c: { rating: number }) => c.rating + a,
          0
        ) / updatedProduct.reviews.length;
      await updatedProduct.save();

      await db.disconnect();
      return res.send({ message: "Review updated" });
    } else {
      const review = {
        user: new mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce(
          (a: number, c: { rating: number }) => c.rating + a,
          0
        ) / product.reviews.length;
      await product.save();
      await db.disconnect();
      res.status(201).json({
        message: "Review submitted",
      });
    }
  } else {
    await db.disconnect();
    res.status(404).json({ message: "Product Not Found" });
  }
});

export default handler;
