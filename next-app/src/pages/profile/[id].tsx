import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Posts from "@/components/Posts";
import ProfileInfo from "@/components/ProfileInfo";
import { useState, useContext, useCallback } from "react";
import { PostContext } from "../_app";
import prisma from "../../../lib/prisma";

type ParamsProps = {
  user: string;
};

const Profile: React.FC<ParamsProps> = (params) => {
  const user = params.user;
  const parsedUser = user ? JSON.parse(user) : null;
  const [posts, setPosts] = useState(parsedUser?.posts);
  const [value, setValue] = React.useState("1");
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }


  const deleteHandler = async (id: any) => {
    const result: any = await deletePostHandler(id);
    if (result && result.posts) {
      const posts = result.posts.filter(
        (post: any) => post.authorId === parsedUser.id
      );
      const filteredPosts = posts.map((post: any) => {
        const { author, ...rest } = post;
        return rest;
      });
      setPosts(filteredPosts);
    }
  }

  const updateHandler = useCallback(
    async (args: any) => {
      const result: any = await updatePostHandler(args);
      if (result && result.posts) {
        const filteredPosts = result.posts.map((post: any) => {
          const { author, ...rest } = post;
          return rest;
        });
        const [updatedPost] = filteredPosts
        setPosts((posts: any) => {
          return posts.map((post: any) => {
            if (post.id === updatedPost.id) {
              return { ...updatedPost, author: post.author };
            } else {
              return post;
            }
          })
        })
      } else {
        setPosts([]);
      }
    },
    [updatePostHandler, parsedUser]
  );

  if (!parsedUser) {
    return null;
  }

  const { name, lastname } = parsedUser;
  return (
    <div style={{ maxWidth: "852px", width: "100%", margin: "0 auto" }}>
      <Box sx={{ typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: "sticky",
              paddingTop: "20px",
              top: 0,
              zIndex: 2,
              backgroundColor: "#fff",
            }}
          >
            <Stack spacing={2} direction={{ sm: "column" }}>
              <Stack
                spacing={2}
                direction={{ sm: "row" }}
                alignItems="center"
              >
                <Avatar />
                <Typography>{name}</Typography>
                <Typography>{lastname}</Typography>
              </Stack>
              <TabList onChange={handleChange}>
                <Tab label="Профиль" value="1" />
                <Tab label="Посты" value="2" />
              </TabList>
            </Stack>
          </Box>
          <TabPanel value="1" style={{ paddingLeft: 0, paddingTop: "60px" }}>
            <ProfileInfo user={parsedUser} />
          </TabPanel>
          <TabPanel value="2" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Posts
              posts={posts}
              crudHidden={true}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({});
  const paths = users.map((user) => ({ params: { id: user.id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      posts: {
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: { published: true },
        include: {
          file: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const stringifiedUser = JSON.stringify(user)

  return { props: { user: stringifiedUser } };
};

export default React.memo(Profile);