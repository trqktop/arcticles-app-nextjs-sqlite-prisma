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

const Post = ({ data }: any) => {
  const deleteHandler = async () => {
    // fetch(`http://localhost:3000/api/post/${data.id}`, {
    //   method: "DELETE",
    // });
  };
  console.log(data)
  return (
    <Card>
      <CardHeader
        // avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <CardActions disableSpacing>
            <IconButton aria-label="delete" color="primary" onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" color="primary">
              <EditIcon />
            </IconButton>
          </CardActions>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent> */}

      <CardContent>
        <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
          over medium-high heat. Add chicken, shrimp and chorizo, and cook,
          stirring occasionally until lightly browned, 6 to 8 minutes. Transfer
          shrimp to a large plate and set aside, leaving chicken and chorizo in
          the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about
          10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth;
          bring to a boil.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
