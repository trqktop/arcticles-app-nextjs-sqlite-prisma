import { GetStaticProps } from "next";
import Posts from "@/components/Posts";
import prisma from "../../lib/prisma";
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

  const deleteHandler = async (id: string) => {
    const result: any = await deletePostHandler(id);
    setPosts(result.posts);
  }

  const updateHandler = async (args: UpdatedPost) => {
    try {
      const result: any = await updatePostHandler(args);
      const [updatedPost] = result.posts
      if (args.type === 'create') {
        setPosts(result.posts)
      }
      if (args.type === 'update') {
        setPosts(posts => {
          return posts.map(post => {
            if (post.id === updatedPost.id) {
              return { ...updatedPost, author: post.author };
            } else {
              return post;
            }
          })
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  // async function deleteAllPosts() {
  //   await prisma.post.deleteMany();
  //   await prisma.file.deleteMany();
  //   await prisma.user.deleteMany();
  // }
  // deleteAllPosts();

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
