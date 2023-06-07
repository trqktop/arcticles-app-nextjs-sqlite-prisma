import { Add } from "@mui/icons-material";
import { List, ListItem, Typography } from "@mui/material";
import { memo } from "react";
import CrudForm from "../CrudForm";
import Post from "../Post";

const Posts = ({ posts, crudHidden }: any) => {
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
            <Post data={item} crudHidden={crudHidden} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(Posts);
