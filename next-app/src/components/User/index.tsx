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
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/router";

const User = ({ deleteUserHandler, data }: any) => {
  const session = useSession()
  const route = useRouter()
  const deleteHandler = () => {
    deleteUserHandler(data.id)
  }
  const isCurrentUser = session && session.data?.user.id === data.id;
  const confirm = async (e: any) => {
    deleteUserHandler(data.id)
    if (isCurrentUser) {
      await signOut()
      route.push('/')
    }
  };


  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <CardActions
          disableSpacing
          // onClick={deleteHandler}
          sx={{ justifyContent: "flex-end" }}
        >
          {/* <IconButton color="primary" sx={{ padding: 0 }}> */}
          <Popconfirm
            title="Удалить аккаунт?"
            description="Вы уверены что хотите удалить аккаунт? Все данные будут утрачены."
            onConfirm={(e) => confirm(e)}
            okText="Удалить"
            cancelText="Отменить"
            placement='bottom'
          >
            <Button size='small' danger>Удалить аккаунт</Button>
          </Popconfirm >
          {/* </IconButton> */}
        </CardActions>
        <ProfileInfo user={data} />

      </CardContent>
    </Card >
  );
};

export default User;
