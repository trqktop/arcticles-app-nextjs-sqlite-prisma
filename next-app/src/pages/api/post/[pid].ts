import { PrismaClient } from "@prisma/client";

export default async function handler(req: any, res: any) {
  const { pid } = req.query;
  const prisma = new PrismaClient();
  switch (req.method) {
    case "DELETE":
      await prisma.post.delete({ where: { id: Number(pid) } });
  }

  res.end(`Post: ${pid}`);
}
