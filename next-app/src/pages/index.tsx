import Posts from "@/components/Posts";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import { useSession, getCsrfToken } from "next-auth/react";
import { useEffect } from "react";

const Home = ({ posts }: any) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <h1>loading...</h1>;
  }
  return <Posts data={posts} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  prisma.$disconnect();
  return { props: { posts } };
};

export default Home;

// const createPost = async () => {
//   const prisma = new PrismaClient();
//   const posts = prisma.post;
//   await posts.create({
//     data: {
//       createdAt: "12.12.1999",
//       deletedAt: "12.12.1999",
//       title: "title",
//       updatedAt: "12.12.1995",
//       authorId: 1,
//       content: "content",
//       published: true,
//     },
//   });
//   await prisma.$disconnect();
// };
// const createUser = async () => {
//   const prisma = new PrismaClient();
//   const users = prisma.user;
//   await users.create({
//     data: {
//       date: "12.12.1995",
//       email: "admin@admin.com",
//       number: "123123",
//       role: 1,
//       serial: "123123",
//       surname: "admin",
//       name: "admin",
//       lastname: "admin",
//       password: "admin",
//     },
//   });
//   await prisma.$disconnect();
// };