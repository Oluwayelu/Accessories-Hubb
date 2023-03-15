import nc from "next-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "database";
import { User } from "models";
import { signToken } from "utils/auth";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const { password, email, lastname, firstname, refId = "" } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401).json({ message: "user already exist" });
  } else {
    const userRefId =
      (req.body.firstname.length > 3
        ? req.body.firstname.slice(0, 3).toUpperCase()
        : req.body.firstname.toUpperCase()) +
      "-" +
      new Date().getMilliseconds().toString();

    const secret = email + "_" + new Date().getTime();
    const confirmationCode = jwt.sign({ email }, secret);

    const newUser = new User({
      email,
      lastname,
      firstname,
      confirmationCode,
      refId: userRefId,
      password: bcrypt.hashSync(password),
    });

    const referalUser = await User.findOne({ refId });
    if (!referalUser && refId !== "") {
      return res.status(400).json({ message: "Referal Id does not exist" });
    }

    const user = await newUser.save();

    if (refId) {
      referalUser.referees.push(user._id);
      referalUser.save();
    }

    await db.disconnect();

    const token = signToken(user);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        lastname: user.lastname,
        firstname: user.firstname,
        middlename: user.middlename,
      },
      verifyLink: `http://localhost:3000/api/v1/auth/email/${token} `,
    });
  }
});

export default handler;
