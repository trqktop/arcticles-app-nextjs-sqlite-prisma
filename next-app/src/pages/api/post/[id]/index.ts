import { breadcrumbsClasses } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  const prisma = new PrismaClient();
  switch (req.method) {
    case "DELETE":
      try {
        await prisma.post.update({
          where: { id },
          data: {
            published: false,
          },
        });
        const posts = await prisma.post.findMany({
          include: { author: true },
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
          .json({ message: "Post deleted successfully", posts: posts });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "PATCH":
      const { title, content } = req.body;
      try {
        await prisma.post.update({
          where: {
            id,
          },
          data: {
            title,
            content,
          },
        });
        const posts = await prisma.post.findMany({
          include: { author: true },
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
          .json({ message: "Post update successfully", posts: posts });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      } finally {
        await prisma.$disconnect();
      }
      break;
    case "PUT":
      try {
        await prisma.post.create({
          data: req.body,
        });
        const posts = await prisma.post.findMany({
          include: { author: true },
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
      break;
  }
}