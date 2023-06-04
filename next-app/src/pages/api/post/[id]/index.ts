import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const prisma = new PrismaClient();
    switch (req.method) {
        case "DELETE":
            if (req.method !== 'DELETE') {
                return res.status(405).json({ message: 'Method Not Allowed' });
            }
            if (typeof id !== 'string') {
                return res.status(400).json({ message: 'Invalid id' });
            }
            try {
                await prisma.post.delete({ where: { id: id } });
                const posts = await prisma.post.findMany()
                res.status(200).json({ message: 'Post deleted successfully', posts: posts });
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            } finally {
                await prisma.$disconnect();
            }
        case "UPDATE":
            console.log(req)
        // if (req.method !== 'DELETE') {
        //     return res.status(405).json({ message: 'Method Not Allowed' });
        // }
        // if (typeof id !== 'string') {
        //     return res.status(400).json({ message: 'Invalid id' });
        // }
        // try {
        //     await prisma.post.delete({ where: { id: id } });
        //     const posts = await prisma.post.findMany()
        //     res.status(200).json({ message: 'Post deleted successfully', posts: posts });
        // } catch (error) {
        //     res.status(500).json({ message: 'Internal Server Error' });
        // } finally {
        //     await prisma.$disconnect();
        // }
    }
}

// res.end(`Post: ${pid}`);

