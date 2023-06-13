import { Card, CardContent, CardActions } from "@mui/material";
import React, { memo, useCallback } from "react";
import ProfileInfo from "../ProfileInfo";
import { signOut, useSession } from "next-auth/react";
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/router";

const User = ({ deleteUserHandler, data }: any) => {
  const session = useSession();
  const route = useRouter();

  const confirm = useCallback(
    async (e: any) => {
      const isCurrentUser = session && session.data?.user.id === data.id;
      deleteUserHandler(data.id);
      if (isCurrentUser) {
        await signOut();
        route.push("/");
      }
    },
    [data, deleteUserHandler, route, session]
  );

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
          <Popconfirm
            title="Удалить аккаунт?"
            description="Вы уверены что хотите удалить аккаунт? Все данные будут утрачены."
            onConfirm={(e) => confirm(e)}
            okText="Удалить"
            cancelText="Отменить"
            placement="bottom"
          >
            <Button size="small" danger>
              Удалить аккаунт
            </Button>
          </Popconfirm>
        </CardActions>
        <ProfileInfo user={data} />
      </CardContent>
    </Card>
  );
};

export default memo(User);
