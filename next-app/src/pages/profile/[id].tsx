import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
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

const Profile = (params: any) => {
  const user = params.user;
  if (user) {
    const parsedUser = JSON.parse(user);
    const { name, email, role, surname, lastname } = parsedUser;
    return (
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <Stack
          spacing={2}
          direction={{ sm: "row" }}
          sx={{ alignItems: "center" }}
        >
          <Avatar />
          <Typography>{name}</Typography>
          <Typography>{lastname}</Typography>
        </Stack>
        <ProfileTabs user={parsedUser} />
      </div>
    );
  }
  return null;
};

function ProfileTabs({ user }: any) {
  const [posts, setPosts] = useState(user.posts);
  const [value, setValue] = React.useState("1");
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);

  const deleteHandler = async (id: any) => {
    await deletePostHandler(id);
    setPosts((p: any) => p.filter((item: any) => item.id !== id));
  };

  const updateHandler = async (args: any) => {
    await updatePostHandler(args);
    setPosts((p: any) => {
      return p.map((post: any) => {
        if (post.id === args.id) {
          return { ...p, ...args };
        }
        return post;
      });
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Профиль" value="1" />
            <Tab label="Посты" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProfileInfo user={user} />
        </TabPanel>
        <TabPanel value="2">
          <Posts
            posts={posts}
            crudHidden={true}
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params?.id == "string") {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        posts: {
          where: { published: true },
        },
      },
    });
    return { props: { user: JSON.stringify(user) } };
  }
  return { props: { user: null } };
};
export default Profile;
