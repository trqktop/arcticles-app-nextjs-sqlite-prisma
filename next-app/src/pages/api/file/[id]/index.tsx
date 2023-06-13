import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: { sizeLimit: "25mb" },
  },
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  if (req.method === "GET") {
    const file = await prisma.file.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(file);
  }
  if (req.method === "POST") {
    const id = await prisma.file.create({
      data: req.body,
      select: {
        id: true,
      },
    });
    res.status(200).json(id);
  }
  if (req.method === "DELETE") {
    await prisma.file.delete({
      where: {
        id,
      },
    });
    res.status(200).json("success");
  }
}
