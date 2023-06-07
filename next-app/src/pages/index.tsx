import { GetStaticProps } from "next";
import { useContext } from "react";
import Posts from "@/components/Posts";
import prisma from "../../lib/prisma";
import React, { useState } from "react";
import CrudForm from "@/components/CrudForm";
import { Add } from "@mui/icons-material";
import { PostContext } from "./_app";

const Home = ({ data }: any) => {
  const [posts, setPosts] = useState(JSON.parse(data))
  const { deletePostHandler, updatePostHandler } = useContext(PostContext)
  const deleteHandler = async (id: string) => {
    const result: any = await deletePostHandler(id)
    setPosts(result.posts)
  }
  const updateHandler = async (args: any) => {
    const result: any = await updatePostHandler(args)
    setPosts(result.posts)
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CrudForm title="Создать пост" icon={<Add />} updateHandler={updateHandler} type="create" />
      </div>
      <Posts posts={posts} deleteHandler={deleteHandler} updateHandler={updateHandler} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
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

  return { props: { data: JSON.stringify(posts) } };
};

