import nc from "next-connect";
import bcrypt from "bcryptjs";
import db from "database";
import { User } from "models";
import { signToken, isAuth } from "utils/auth";
import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.user._id);

  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();

  const token = signToken(user);
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
    message: "Password updated successfully",
  });
});

export default handler;
