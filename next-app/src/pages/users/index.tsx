import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import React, { memo, useCallback, useEffect, useState } from "react";
import UserList from "@/components/UserList";
import { useRouter } from "next/router";

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

export const getStaticProps: GetStaticProps = async () => {
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
