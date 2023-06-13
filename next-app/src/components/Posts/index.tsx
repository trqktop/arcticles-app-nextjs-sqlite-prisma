import { Add } from "@mui/icons-material";
import { List, ListItem, Typography } from "@mui/material";
import { memo } from "react";
import CrudForm from "../CrudForm";
import Post from "../Post";
import { useContext } from 'react'
import { PostContext } from "@/pages/_app";



const Posts = ({ posts, crudHidden, deleteHandler, updateHandler }: any) => {
  if (posts)
    return (
      <>
        <List>
          {posts.map((item: any) => (
            <ListItem key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Post data={item} crudHidden={crudHidden} deleteHandler={deleteHandler} updateHandler={updateHandler} />
            </ListItem>
          ))}
        </List >
      </>
    );
  return null
};

export default memo(Posts);
