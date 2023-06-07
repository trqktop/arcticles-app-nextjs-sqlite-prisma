import { Add } from "@mui/icons-material";
import { List, ListItem, Typography } from "@mui/material";
import { memo } from "react";
import CrudForm from "../CrudForm";
import Post from "../Post";
import { useContext } from 'react'
import { PostContext } from "@/pages/_app";




const Posts = ({ posts, crudHidden, deleteHandler, updateHandler }: any) => {
  return (
    <>
      <List
        sx={{
          minWidth: "100%",
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          rowGap: "80px",
        }}
      >
        {posts.map((item: any) => (
          <ListItem key={item.id} sx={{ maxWidth: "780px", margin: "auto" }}>
            <Post data={item} crudHidden={crudHidden} deleteHandler={deleteHandler} updateHandler={updateHandler} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(Posts);
