import { GetStaticPaths, GetStaticProps } from "next";
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
import { useState, useContext } from "react";
import { PostContext } from "../_app";
import prisma from "../../../lib/prisma";

type ParamsProps = {
  user: string;
};

const Profile: React.FC<ParamsProps> = (params) => {
  const user = params.user;
  const parsedUser = JSON.parse(user);
  const [posts, setPosts] = useState(parsedUser?.posts);
  const [value, setValue] = React.useState("1");
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);

  const handleChange = React.useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    },
    []
  );

  const deleteHandler = React.useCallback(
    async (id: any) => {
      const result: any = await deletePostHandler(id);
      if (result && result.posts) {
        const posts = result.posts.filter(
          (post: any) => post.authorId === parsedUser.id
        );
        setPosts(posts);
      }
    },
    [deletePostHandler, parsedUser]
  );

  const updateHandler = React.useCallback(
    async (args: any) => {
      const result: any = await updatePostHandler(args);
      if (result && result.posts) {
        const posts = result.posts.filter(
          (post: any) => post.authorId === parsedUser.id
        );
        setPosts(posts);
      } else {
        setPosts([]);
      }
    },
    [updatePostHandler, parsedUser]
  );

  if (parsedUser) {
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
  }
  return null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id == "string") {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
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
    return { props: { user: JSON.stringify(user) } };
  }
  return { props: { user: null } };
};

export default React.memo(Profile);
