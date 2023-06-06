import { List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
} from "@mui/material";
import { Tooltip } from "@mui/joy";
import React from "react";
import User from "../User";

const UserList = ({ users, deleteUserHandler }: any) => {
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
      {users.map((item: any) => (
        <ListItem key={item.id} sx={{ maxWidth: "780px", margin: "auto" }}>
          <User deleteUserHandler={deleteUserHandler} data={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
