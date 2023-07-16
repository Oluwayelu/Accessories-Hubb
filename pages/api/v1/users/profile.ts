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

  console.log(req.body)
  user.email = req.body.email ? req.body.email : user.email;
  user.isAdmin = req.body.isAdmin ? req.body.isAdmin : user.isAdmin;
  user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
  user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
  user.middlename = req.body.middlename ? req.body.middlename : user.middlename;
  user.gender = req.body.gender ? req.body.gender : user.gender;
  user.phoneNumber = req.body.phoneNumber
    ? req.body.phoneNumber
    : user.phoneNumber;
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
    message: "Profile updated successfully",
  });
});

export default handler;
