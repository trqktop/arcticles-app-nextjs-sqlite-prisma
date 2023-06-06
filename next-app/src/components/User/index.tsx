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

const User = ({ deleteUserHandler, data }: any) => {

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        action={
          <CardActions
            disableSpacing
            onClick={() => deleteUserHandler(data.id)}
          >
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        }
        title={"Пользователь: " + data.name + " " + data.surname}
        subheader={`права: ${data.role === "1" ? "admin" : "user"}`}
      />
      <CardContent>
        {/* <Typography paragraph>{"имя " + data.name}</Typography> */}
        <Typography paragraph>{"почта " + data.email}</Typography>
        <Typography paragraph>{"id " + data.id}</Typography>
      </CardContent>
    </Card>
  );
};

export default User;
