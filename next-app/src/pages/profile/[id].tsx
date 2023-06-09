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
  const parsedUser = JSON.parse(user);
  const [posts, setPosts] = useState(parsedUser?.posts);
  const [value, setValue] = React.useState("1");
  const { deletePostHandler, updatePostHandler } = useContext(PostContext);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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

  if (parsedUser) {
    const { name, email, role, surname, lastname } = parsedUser;
    return (
      <div style={{ maxWidth: '852px', width: '100%', margin: '0 auto', marginTop:'-100px' }}>
        <Box sx={{ typography: "body1" }} >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", position: 'sticky', paddingTop: '20px', top: 0, zIndex: 2, backgroundColor: '#fff' }}>
              <Stack
                spacing={2}
                direction={{ sm: 'column' }}
              >
                <Stack
                  spacing={2}
                  direction={{ sm: "row" }}
                  alignItems='center'
                >
                  <Avatar />
                  <Typography>{name}</Typography>
                  <Typography>{lastname}</Typography>
                </Stack>
                <TabList onChange={handleChange} >
                  <Tab label="Профиль" value="1" />
                  <Tab label="Посты" value="2" />
                </TabList>
              </Stack>
            </Box>
            <TabPanel value="1">
              <ProfileInfo user={parsedUser} />
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
      </div>
    );
  }
  return null;
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
                name: true
              }
            }
          }
        },
      },
    });
    return { props: { user: JSON.stringify(user) } };
  }
  return { props: { user: null } };
};
export default Profile;
