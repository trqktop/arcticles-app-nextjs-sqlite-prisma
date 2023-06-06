import {
  FavoriteOutlined,
  MoreVertOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  // Typography,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import NextLink from "next/link";
import Typography from "@mui/joy/Typography";
import { Box, Divider, Link, Stack, Tooltip } from "@mui/joy";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import CrudForm from "../CrudForm";
import { PostContext } from "@/pages";
import CenterFocusWeak from "@mui/icons-material/CenterFocusWeak";

const Post = ({ data }: any) => {
  const { deletePostHandler } = useContext(PostContext);

  const deleteHandler = async () => {
    deletePostHandler(data.id);
  };
  const ButtonGroup = () => {
    const session = useSession();

    if (session?.data?.user?.role === "1") {
      return (
        <React.Fragment>
          <Tooltip title="delete post">
            <IconButton color="primary" onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <CrudForm icon={<EditIcon />} type="update" data={data} />
        </React.Fragment>
      );
    }
    return null;
  };


  const AuthorLink = ({ author }: any) => {
    if (author)
      return (
        <NextLink href={`profile/${author.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src="/broken-image.jpg" sizes="sm" sx={{ width: '16px', height: '16px' }} />
          <Typography sx={{ fontSize: '14px', color: '#1976d2' }}>{author.name} {author.surname}</Typography>
        </NextLink>
      );
    return null;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        action={
          <CardActions disableSpacing>
            <ButtonGroup />
          </CardActions>
        }
        title={
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} level="h1">
            {data.title}
          </Typography>
        }
      />
      <CardContent sx={{ paddingTop: '8px' }}>
        <Typography level="body1" fontSize="sm" sx={{ paddingBottom: '16px' }}>
          {data.content}
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-start", gap: '8px' }}>
          <Typography sx={{ fontSize: 14 }} gutterBottom level="body5">
            LastUpdated : {data.updatedAt}
          </Typography>
          <Divider orientation="vertical" sx={{ height: '16px' }} />
          <Typography sx={{ fontSize: 14 }} level="body5">
            Created : {data.createdAt}
          </Typography>
        </div>
        <AuthorLink author={data.author} />
      </CardContent>
    </Card>
  );
};

export default Post;


