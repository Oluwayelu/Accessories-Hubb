import nc from "next-connect";
import db from "database";
import jwt from "jsonwebtoken";
import { User } from "models";
import { sendEmail } from "helpers";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const resetToken = user.getResetPasswordToken(req.body.email);
    const message = `Hello, ${user.firstname} \n\n\ We have received a request to reset your password. \n\n\ \n\n\ Your password reset url is as follow: \n\n http://localhost:3000/auth/password/reset/${resetToken} \n\n\ \n\n\ If you have not requested this email, then ignore it. \n\n\ You do not need to reply to this email.`;

    // await sendEmail({
    //   from: `${process.env.STMP_FROM_NAME} < ${process.env.STMP_FROM_EMAIL}>`,
    //   email: user.email,
    //   subject: "Reset Password",
    //   message,
    // });

    await user.save();

    res.status(200).json({
      message: `Reset password link has been sent to your email: ${req.body.email}`,
      url: `http://localhost:3000/auth/password/reset/${resetToken}`,
    });

    db.disconnect();
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

export default handler;
