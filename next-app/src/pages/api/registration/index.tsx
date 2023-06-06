import { breadcrumbsClasses } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({ message: "success" });
  }
}
