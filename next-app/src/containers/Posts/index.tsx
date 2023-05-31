import { useEffect, useState } from "react";
import Post from "../../components/Post";
import { List, ListItem } from "@mui/material";
import Form from "@/components/Form";
import { Add } from "@mui/icons-material";

type State = {
  posts: any[],
}
const Posts = ({ data }: { data: any[] }) => {
  const [state, setState] = useState<State>({
    posts: [],
  })

  const deleteHandler = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setState((p) => ({ ...p, posts: data }))
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setState((p) => ({ ...p, posts: data }))
  }, [])




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
      <Form create={true} />
      {state.posts.map((item) => (
        <ListItem key={item.id} sx={{ maxWidth: "780px", margin: "auto" }}>
          <Post data={item} deleteHandler={deleteHandler} />
        </ListItem>
      ))}
    </List>
  );
};

export default Posts;
