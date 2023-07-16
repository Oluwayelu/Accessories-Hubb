import nc from "next-connect";

import db from "database";
import multer from "multer";
import streamifier from "streamifier";

import { isAuth } from "utils/auth";
import type { NextApiResponse } from "next";
import { INextApiRequest } from "interface";
import { getError } from "utils/error";

const handler = nc();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let file_path;

    console.log(file)
    if (req.body.type === "product") {
      file_path = "products";
    } else if (req.body.type === "avatar") {
      file_path = "avatars";
    } else {
      file_path = "";
    }

    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(req.body.type)
    cb(null, Date.now() + "-" + file.originalname)
  },
});

const upload = multer({ storage });

handler.use(isAuth);

handler.use(upload.single("file"));
// handler.get(async (req: INextApiRequest, res: NextApiResponse) => {
//   await db.connect();
// });

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  // console.log(req.body.type)
  try {
    res.status(200).json({
      message: "Upload successful",
      // urlPath: "/uploads/" + req.body.type + "/" + req.file.filename,
      urlPath: "/uploads/"  + req.file.filename,
    });
  } catch (err) {
    res.status(400).json({ message: getError(err) });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
