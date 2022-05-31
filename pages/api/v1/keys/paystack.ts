import nc from "next-connect";
import { isAuth } from "utils/auth";
import type { NextApiResponse } from "next";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res: NextApiResponse) => {
  res.status(200).send(process.env.PAYSTACK_PUBLIC_KEY || "sb");
});

export default handler;
