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
import { signOut, useSession } from "next-auth/react";
import { Popconfirm } from "antd";
import { useRouter } from "next/router";

const User = ({ deleteUserHandler, data }: any) => {
  const session = useSession()
  const route = useRouter()
  const deleteHandler = () => {
    deleteUserHandler(data.id)
  }

  const confirm = (e: any) => {
    deleteUserHandler(data.id)
    signOut()
    route.push('/')
  };

  const isCurrentUser = session && session.data?.user.id === data.id;
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <CardActions
          disableSpacing
          // onClick={deleteHandler}
          sx={{ justifyContent: "flex-end" }}
        >
          {isCurrentUser ? <IconButton color="primary" sx={{ padding: 0 }}>
            <Popconfirm
              title="Удалить аккаунт"
              description="Это вы. Если вы удалите свой аккаунт вы будете будете выброшены на главную"
              onConfirm={(e) => confirm(e)}
              okText="Удалить"
              cancelText="Отменить"
              placement='bottom'
            >
              <DeleteIcon />
            </Popconfirm >
          </IconButton> :
            <IconButton color="primary" sx={{ padding: 0 }}> <DeleteIcon onClick={deleteHandler} /></IconButton>
          }
        </CardActions>
        <ProfileInfo user={data} />

      </CardContent>
    </Card >
  );
};

export default User;
