import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "database";
import { User } from "models";
import { signToken } from "utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { accountStatusEnum } from "utils/enums";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    if (user.status !== accountStatusEnum.ACTIVE) {
      return res
        .status(401)
        .send({ message: "Pending Account. Please Verify Your Email!" });
    }

    user.lastVisited = new Date();
    await user.save();
    const token = signToken(user);

    await db.disconnect();
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        imgUrl: user.imgUrl,
        gender: user.gender,
        isAdmin: user.isAdmin,
        lastname: user.lastname,
        firstname: user.firstname,
        phoneNumber: user.phoneNumber
      },
      message: "Login successfull",
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
