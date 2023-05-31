import Post from "../Post";
import { List, ListItem } from "@mui/material";
const Posts = ({ data }: { data: any[] }) => {
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
      {data.map((item) => (
        <ListItem key={item.id} sx={{ maxWidth: "780px", margin: "auto" }}>
          <Post data={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default Posts;
