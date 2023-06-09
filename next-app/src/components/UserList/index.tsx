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
import ProfileInfo from "../ProfileInfo";

const UserList = ({ users, deleteUserHandler }: any) => {
  return (
    <List
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        maxWidth: "900px",
        margin:'auto'
      }}
    >
      {users.map((item: any) => (
        <ListItem
          key={item.id}
          sx={{
            maxWidth: "300px",
            minHeight: "100%",
          }}
        >
          <User deleteUserHandler={deleteUserHandler} data={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
