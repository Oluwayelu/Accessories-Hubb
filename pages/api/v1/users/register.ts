import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "database";
import { User } from "models";
import { signToken } from "utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    res.status(401).json({ message: "user already exist" });
  } else {
    const newUser = new User({
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    await db.disconnect();

    const token = signToken(user);
    res.status(200).json({
      token,
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      lastname: user.lastname,
      firstname: user.firstname,
      middlename: user.middlename,
    });
  }
});

export default handler;
