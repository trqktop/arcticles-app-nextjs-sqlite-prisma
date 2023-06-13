import React, { memo, useCallback } from "react";
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardContent,
} from "@mui/material";
import NextLink from "next/link";
import { Box, Divider, Tooltip } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSession } from "next-auth/react";
import CrudForm from "../CrudForm";
import styles from "./Post.module.scss";
import DateComponent from "../DateComponent";
import { Download } from "@mui/icons-material";

interface PostProps {
  data: any;
  crudHidden: boolean;
  deleteHandler: (id: number) => void;
  updateHandler: (id: number) => void;
}

const Post: React.FC<PostProps> = ({
  data,
  crudHidden,
  deleteHandler,
  updateHandler,
}) => {
  const deletePost = useCallback(async () => {
    deleteHandler(data.id);
  }, [data.id, deleteHandler]);

  const downloadPDF = useCallback(() => {
    fetch(`/api/file/${data.file.id}`)
      .then((res) => res.json())
      .then((res) => {
        const { content } = res;
        const byteCharacters = atob(content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = data.file.name;
        link.click();
      });
  }, [data.file]);

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
          passHref
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#1976d2",
          }}
        >
          <Avatar
            sizes="sm"
            sx={{ width: "16px", height: "16px" }}
            src={author.avatar}
          />
          <Typography>{author.name}</Typography>
        </NextLink>
      );
    return null;
  };

  return (
    <Card className={styles.post}>
      <CardHeader
        className={styles.header}
        action={
          <Box>
            <ButtonGroup />
          </Box>
        }
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              padding: 0,
              margin: 0,
            }}
          >
            <AuthorLink author={data.author} crudHidden={crudHidden} />
          </Box>
        }
      />
      <CardContent sx={{ padding: 0, marginTop: "15px" }}>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "8px" }}
          variant="h1"
        >
          {data.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ paddingBottom: "16px" }}
          style={{ display: "flex", minWidth: "100%" }}
        >
          {data.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              margin: "auto",
              height: "min-content",
            }}
          >
            <DateComponent title="Создано:" date={data.createdAt} />
            <Divider orientation="vertical" sx={{ height: "16px" }} />
            <DateComponent title="Обновлено:" date={data.updatedAt} />
          </Box>
          {data.file && (
            <>
              <IconButton color="primary" onClick={downloadPDF}>
                <Typography variant="body2"> {data.file.name}</Typography>
                <Download sx={{ fontSize: "24px", marginLeft: "8px" }} />
              </IconButton>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(Post);
