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
import { PostContext } from "@/pages/_app";

import styles from "./Post.module.scss";
import DateComponent from "../DateComponent";

const Post = ({ data, crudHidden, deleteHandler, updateHandler }: any) => {
  const deletePost = async () => {
    deleteHandler(data.id);
  };


  const ButtonGroup = () => {
    const session = useSession();
    if (session?.data?.user?.role === "1") {
      return (
        <React.Fragment>
          <Tooltip title="Удалить пост">
            <IconButton color="primary" onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <CrudForm
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            title="Обновить пост"
            icon={<EditIcon />}
            type="update"
            data={data}
          />
        </React.Fragment>
      );
    }
    return null;
  };

  const AuthorLink = ({ author, crudHidden }: any) => {
    if (author)
      return (
        <NextLink
          href={`profile/${author.id}`}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Avatar sizes="sm" sx={{ width: "16px", height: "16px" }} />
          <Typography sx={{ fontSize: "14px", color: "#1976d2" }}>
            {author.name}
          </Typography>
        </NextLink>
      );
    return null;
  };

  return (
    <Card className={styles.post}>
      <CardHeader
        className={styles.header}
        action={
          (
            <CardActions disableSpacing>
              <ButtonGroup />
            </CardActions>
          )
        }
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              padding: 0,
              margin: 0,
            }}
          >
            <AuthorLink author={data.author} crudHidden={crudHidden} />
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <DateComponent title="Дата создания" date={data.createdAt} />
              <Divider orientation="vertical" sx={{ height: "16px" }} />
              <DateComponent
                title="Дата последнего обновления"
                date={data.updatedAt}
              />
            </div>
          </div>
        }
      />
      <CardContent sx={{ padding: 0, marginTop: "15px" }}>
        <Typography sx={{ fontSize: 24, fontWeight: "bold" }} level="h1">
          {data.title}
        </Typography>
        <Typography level="body1" fontSize="sm" sx={{ paddingBottom: "16px" }}>
          {data.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
