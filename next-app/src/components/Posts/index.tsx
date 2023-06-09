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
          bgcolor: "background.paper",
          display: 'flex', flexDirection: 'column', gap: '22px',
          minWidth: '100%'
        }}
      >
        {posts.map((item: any) => (
          <ListItem key={item.id} style={{ padding: 0, display: 'flex', flexDirection: 'column',  minWidth: '100%' }}>
            <Post data={item} crudHidden={crudHidden} deleteHandler={deleteHandler} updateHandler={updateHandler} />
          </ListItem>
        ))}
      </List >
    </>
  );
};

export default memo(Posts);
