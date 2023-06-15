import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export const config = {
  api: {
    bodyParser: { sizeLimit: "25mb" },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = await prisma.file.create({
      data: req.body,
      select: {
        id: true,
      },
    });
    res.status(200).json(id);
  }
  res.end();
}
