import { breadcrumbsClasses } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;
  if (req.method === "PATCH") {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: req.body,
      },
    });
    console.log(id, req.body, 'FROM [id]')
    res.end();
  } else if (req.method === "DELETE") {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "done", data: users });
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "done", data: user });
  }
}
