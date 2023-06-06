import Content from "@/components/Content";
import Header from "@/components/Header";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Posts from "@/components/Posts";
import prisma from "../../lib/prisma";
import React from "react";

type PostFormData = {
  title: string;
  content: string;
  type: "update" | "create";
  id?: string;
  authorId: string;
};

export const PostContext = React.createContext({
  deletePostHandler: (id: string) => Promise.resolve(),
  updatePostHandler: (args: PostFormData) => Promise.resolve(),
});

const Home = ({ data }: any) => {
  const [state, setState] = useState({
    posts: JSON.parse(data),
  });

  const deletePostHandler = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setState((p) => ({ ...p, posts: data.posts }));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostHandler = async ({ type, id, ...data }: PostFormData) => {
    switch (type) {
      case "update":
        try {
          const response = await fetch(`http://localhost:3000/api/post/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          setState((p) => ({ ...p, posts: result.posts }));
        } catch (error) {
          console.log(error);
        }
        break;
      case "create":
        try {
          const response = await fetch(`http://localhost:3000/api/post/new`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          setState((p) => ({ ...p, posts: result.posts }));
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  return (
    <div>
      <PostContext.Provider value={{ deletePostHandler, updatePostHandler }}>
        <Posts posts={state.posts} />
      </PostContext.Provider>
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
