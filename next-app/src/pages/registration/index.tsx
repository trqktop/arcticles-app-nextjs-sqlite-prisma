import { Card, Typography } from "@mui/joy";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const submitHandler = async (form: FormData) => {
    setLoading(true);
    const { email, password } = form;
    await fetch("api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(async () => {
      await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
        redirect: true,
      });
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 30 },
    },
  };
  return (
    <Card style={{ margin: "auto" }} size='sm'>
      <Form
        {...formItemLayout}
        size='middle'
        disabled={loading}
        name="registration"
        // labelCol={{ span: 8 }}
        layout="horizontal"
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Form.Item
          label={<Typography fontSize={14} level='body1'>Почта</Typography>}
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Поле должно быть формата name@domen.ru",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<Typography fontSize={14} level='body1'>Пароль</Typography>}
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пароль должен быть от 4 до 16 символов",
              min: 4,
              max: 16,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={<Typography fontSize={14} level='body1'>Отчество</Typography>}
          name="surname"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Фамилия должна быть от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input />
        </Form.Item>




        <Form.Item
          label={<Typography fontSize={14} level='body1'>Имя</Typography>}
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Имя должно содержать от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="lastname"
          label={<Typography fontSize={14} level='body1'>Фамилия</Typography>}
          rules={[
            {
              message: "Отчество должно содержать от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="serial"
          label={<Typography fontSize={14} level='body1'>Серия</Typography>}
          rules={[
            {
              message: "Серия должна содержать от 4 до 10 символов",
              min: 4,
              max: 10,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          label={<Typography fontSize={14} level='body1'>Номер</Typography>}
          name="number"
          rules={[
            {
              message: "Номер должен содержать от 6 до 10 символов",
              min: 6,
              max: 10,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
       label={<Typography fontSize={14} level='body1'>Дата</Typography>}
          name="date"
          hasFeedback
        >
          <DatePicker />
        </Form.Item>

        <Form.Item hasFeedback label={<Typography fontSize={14} level='body1'>Роль</Typography>} name="role" initialValue={"1"}>
          <Select
            options={[
              {
                value: "1",
                label: <Typography fontSize={14} level='body1'>Админ</Typography>
              },
              {
                value: "2",
                label: <Typography fontSize={14} level='body1'>Пользователь</Typography>
              },
            ]}
          />
        </Form.Item>
        <Form.Item >
          <Button loading={loading} type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Card >
  );
};

export default Registration;
