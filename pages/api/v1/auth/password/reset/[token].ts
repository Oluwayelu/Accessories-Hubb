import nc from "next-connect";
import db from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "models";
import { sendEmail } from "helpers";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();

handler.put(async (req: INextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const resetPasswordToken = req.query.token;

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).json({ message: "Password does not match" });
    }

    if (!user) {
      res.status(400).json({
        message: "Password reset token is invalid or has been expired",
      });
    }

    user.password = bcrypt.hashSync(req.body.password);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    db.disconnect();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(200).json({
      message: "Could not update Password",
    });
  }
});

export default handler;
