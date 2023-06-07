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
import ProfileInfo from "../ProfileInfo";

const User = ({ deleteUserHandler, data }: any) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <CardActions
          disableSpacing
          onClick={() => deleteUserHandler(data.id)}
          sx={{ justifyContent: "flex-end" }}
        >
          <IconButton color="primary" sx={{ padding: 0 }}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <ProfileInfo user={data} />
      </CardContent>
    </Card>
  );
};

export default User;
