import { List, ListItem } from "@mui/material";
import Post from "../Post";


const Posts = ({ posts }: any) => {

  return (
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
          <Post data={item} />
        </ListItem>
      ))}
    </List>
  );

}




export default Posts