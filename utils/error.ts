import db from "database";
import { NextApiRequest, NextApiResponse } from "next";

const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

const onError = async (
  err: Error,
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  await db.disconnect();
  res.status(500).send({ message: err.toString() });
};
export { getError, onError };
