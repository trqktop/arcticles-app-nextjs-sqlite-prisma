import {
  FavoriteOutlined,
  MoreVertOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";

const Post = ({ data }: any) => {

  const deleteHandler = async () => {
    // fetch(`http://localhost:3000/api/post/${data.id}`, {
    //   method: "DELETE",
    // });
  };


  const ButtonGroup = () => {
    const session = useSession()
    if (session?.data?.user?.role === '1') {
      return (
        <>
          <IconButton aria-label="delete" color="primary" onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" color="primary">
            <EditIcon />
          </IconButton>
        </>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader
        action={
          <CardActions disableSpacing>
            <ButtonGroup />
          </CardActions>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography paragraph>
          {data.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
