import Content from "@/components/Content";
import Header from "@/components/Header";
import { GetStaticProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Posts from "@/components/Posts";
import prisma from "../../../lib/prisma";
import React from "react";
import UserList from "@/components/UserList";
import { useRouter } from "next/router";
type PostFormData = {
  title: string;
  content: string;
  type: "update" | "create";
  id?: string;
};

const Users = ({ data }: any) => {
  const session = useSession();
  const router = useRouter();
  const [state, setState] = useState({
    users: JSON.parse(data),
  });

  const deleteUserHandler = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setState((p) => ({ ...p, users: result.data }));
    } catch (error) {
      console.log(error);
    }
  };

  if (session.data?.user.role === "1")
    return (
      <div>
        <UserList users={state.users} deleteUserHandler={deleteUserHandler} />
      </div>
    );
  else {
    if (typeof window !== "undefined") {
      router.push("/");
      return null;
    }
  }
};

export default Users;

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  return { props: { data: JSON.stringify(users) } };
};