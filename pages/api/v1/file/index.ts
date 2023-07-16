import fs from "fs";
import path from "path"
import nc from "next-connect";
import { isAuth } from "utils/auth";

import type { NextApiResponse } from "next";
import type { INextApiRequest } from "interface";

const handler = nc();
handler.use(isAuth);

handler.post(async (req: INextApiRequest, res: NextApiResponse) => {
  const url = req.body.url;
  const directoryPath = __dirname + "/public/uploads";
  console.log(path.join(__dirname, "../../../public", url))
  // process.chdir("/public")



  // fs.unlink(directoryPath + url, (err) => {
  //   if (err) {
  //     res.status(500).json({ message: "Could not delete the file", err });
  //   }

  //   res.status(200).json({ message: "File deleted successfully" });
  // });

  try {
    // await fs.unlinkSync(directoryPath + url);
    let files = fs.readdirSync(path.join(__dirname, "../../../"))

    files.forEach(file => {
      console.log(file)
    })

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete the file", err });
  }
});

export default handler;
