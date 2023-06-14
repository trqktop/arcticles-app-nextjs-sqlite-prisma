import { GetStaticProps } from "next";
import Posts from "@/components/Posts";

import React, { useState, useMemo, memo, useCallback, useContext } from "react";
import CrudForm from "@/components/CrudForm";
import { Add } from "@mui/icons-material";
import { PostContext } from "./_app";
import { Post, UpdatedPost } from "@/types";
import styles from "./Home.module.scss";
type Props = {
  data: string;
};

const Home: React.FC<Props> = ({ data }) => {
  const [posts, setPosts] = useState<Post[]>(JSON.parse(data));
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);

  const deleteHandler = useCallback(
    async (id: string) => {
      const result: any = await deletePostHandler(id);
      setPosts(result.posts);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateHandler = useCallback(
    async (args: UpdatedPost) => {
      try {
        const result: any = await updatePostHandler(args);
        setPosts(result.posts);
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const crudFormProps = useMemo(
    () => ({
      title: "Новая статья",
      icon: <Add />,
      updateHandler,
      type: "create",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const postsProps = useMemo(
    () => ({
      posts,
      deleteHandler,
      updateHandler,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts]
  );

  return (
    <>
      <div className={styles.container}>
        <CrudForm {...crudFormProps} />
      </div>
      {posts && <Posts {...postsProps} />}
    </>
  );
};

export default memo(Home);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
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
  });

  return { props: { data: JSON.stringify(posts) } };
};
