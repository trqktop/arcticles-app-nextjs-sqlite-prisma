import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import React, { memo, useCallback, useState } from "react";
import UserList from "@/components/UserList";

type Props = {
  data: string;
};

const Users: React.FC<Props> = ({ data }) => {
  const session = useSession();
  const [state, setState] = useState({
    users: JSON.parse(data),
  });

  const deleteUserHandler = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setState((p) => ({ ...p, users: result.data }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (session.data?.user.role === "1")
    return (
      <UserList users={state.users} deleteUserHandler={deleteUserHandler} />
    );
  return null;
};

export default memo(Users);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user.role !== "1") {
    return { redirect: { destination: "/", permanent: true }, props: [] };
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
