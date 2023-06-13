import { List, ListItem } from "@mui/material";
import { memo } from "react";
import Post from "../Post";

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
            <Post
              data={item}
              crudHidden={crudHidden}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(Posts);
