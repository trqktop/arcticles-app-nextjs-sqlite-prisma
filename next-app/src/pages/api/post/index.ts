import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET')
    try {
      try {
        await prisma.post.create({
          data: req.body,
        });
      } catch (error) {
        console.log(error);
      }
      const posts = await prisma.post.findMany({
        include: {
          author: true,
          file: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          published: true,
        },
      });
      res
        .status(200)
        .json({ message: "Post create successfully", posts: posts });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  res.end();
}


