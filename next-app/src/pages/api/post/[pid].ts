import { PrismaClient } from "@prisma/client";

export default async function handler(req: any, res: any) {
  const { pid } = req.query;
  const prisma = new PrismaClient();
  switch (req.method) {
    case "DELETE":
      await prisma.post.delete({ where: { id: Number(pid) } });
      const posts = await prisma.post.findMany();
      res.json(posts);
  }

  // res.end(`Post: ${pid}`);
}
