import { GetStaticProps } from "next";
import { useContext } from "react";
import Posts from "@/components/Posts";
import prisma from "../../lib/prisma";
import React, { useState } from "react";
import CrudForm from "@/components/CrudForm";
import { Add } from "@mui/icons-material";
import { PostContext } from "./_app";
import { Post } from "@/types";
import { Button } from "@mui/joy";

const Home = ({ data }: { data: string }) => {
  const [posts, setPosts] = useState<Post[]>(JSON.parse(data));
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);
  const deleteHandler = async (id: string) => {
    const result: any = await deletePostHandler(id);
    setPosts(result.posts);
  };
  const updateHandler = async (args: any) => {
    const result: any = await updatePostHandler(args);
    setPosts(result.posts);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", }}>
        <CrudForm
          title="Новая статья"
          icon={<Add />}
          updateHandler={updateHandler}
          type="create"
        />
      </div>
      {posts && (
        <Posts
          posts={posts}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    include: {  
      author: true,
      file: {
        select: {
          id: true,
          name: true
        }
      }
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

  return { props: { data: JSON.stringify(posts) } };
};
