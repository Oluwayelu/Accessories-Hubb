import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "database";
import { User } from "models";
import { signToken } from "utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.status(200).json({
      token,
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      lastname: user.firstname,
      firstname: user.firstname,
      middlename: user.middlename,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
