import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CardActions,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { DeleteOutline } from '@mui/icons-material';

const getFormatedDate = (date: string) => {
  const formatedDate = new Date(date);
  const day = formatedDate.getDate().toString().padStart(2, '0');
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formatedDate.getFullYear().toString();
  return `${day}-${month}-${year}`;
};
const UserList = ({ users, deleteUserHandler }: any) => {
  const session = useSession()
  const route = useRouter()
  if (!session || session?.data?.user.role !== '1') {
    route.push('/')
  }

  const confirm = async (e: any, id: string) => {
    const isCurrentUser = session && session.data?.user.id === id;
    console.log(isCurrentUser)
    await deleteUserHandler(id)
    if (isCurrentUser) {
      await route.push('/')
      await signOut()
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Отчество',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Пароль',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Серия',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date) => getFormatedDate(date)
    },
    {
      title: 'Кол-во постов',
      dataIndex: 'posts',
      key: 'posts',
      render: (arr) => arr?.length ?? 0
    },
    {
      title: 'Роль',
      key: 'role',
      dataIndex: 'role',
      render: (_, record: any) => {
        let isAdmin = record.role === '1'
        let color = isAdmin ? 'geekblue' : 'green';
        let text = isAdmin ? 'Админ' : 'Пользователь'
        return (
          <Tag color={color} key={record.id}>
            {text.toUpperCase()}
          </Tag>
        );
      }
    },


    {
      key: 'action',
      render: (_, record: any) => (
        <CardActions
          disableSpacing
        >
          <Popconfirm
            title="Удалить аккаунт?"
            description="Вы уверены что хотите удалить аккаунт? Все данные будут утрачены."
            onConfirm={(e) => confirm(e, record.id)}
            okText="Удалить"
            cancelText="Отменить"
            placement='left'
          >
            {/* <Button size='middle' >Удалить аккаунт</Button> */}
            <Button danger type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}><DeleteOutline sx={{ width: '20px', height: '20px' }} />Удалить</Button>
          </Popconfirm >
        </CardActions>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={users} rowKey="id" style={{ marginTop: '40px' }} pagination={false} />
  );
};

export default UserList;
