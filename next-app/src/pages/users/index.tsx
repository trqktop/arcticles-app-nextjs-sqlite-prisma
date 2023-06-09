import Content from "@/components/Content";
import Header from "@/components/Header";
import { GetServerSideProps, GetStaticProps } from "next";
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

const Users = ({ data, redirect }: any) => {
  const session = useSession();
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
};

export default Users;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user.role !== '1') {
    return { redirect: { destination: '/', permanent: true, }, props: [] }
  }
  const users = await prisma.user.findMany({
    include: {
      posts: {
        include: {
          author: true,
          file: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          published: true,
        },
      },
    },
  });
  return { props: { data: JSON.stringify(users) } };
};
