import { Card, Typography } from "@mui/joy";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { signIn } from "next-auth/react";
import { memo, useCallback, useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const Registration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const submitHandler = useCallback(async (form: FormData) => {
    setLoading(true);
    const { email, password } = form;

    try {
      await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then(async () => {
        try {
          await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/",
            redirect: true,
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Card style={{ margin: "auto" }} size="sm">
      <Form
        size="middle"
        disabled={loading}
        name="registration"
        layout="horizontal"
        onFinish={submitHandler}
        style={{ width: "320px" }}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Поле должно быть формата name@domen.ru",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Почта *" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Пароль должен быть от 4 до 16 символов",
              min: 4,
              max: 16,
            },
          ]}
        >
          <Input.Password placeholder="Пароль *" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Имя должно содержать от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input placeholder="Имя *" />
        </Form.Item>
        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: "Фамилия должна быть от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input placeholder="Фамилия *" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              message: "Отчество должно содержать от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input placeholder="Отчество" />
        </Form.Item>
        <Form.Item
          name="serial"
          rules={[
            {
              message: "Серия должна содержать от 4 до 10 символов",
              min: 4,
              max: 10,
            },
          ]}
        >
          <Input placeholder="Серия" />
        </Form.Item>
        <Form.Item
          name="number"
          rules={[
            {
              message: "Номер должен содержать от 6 до 10 символов",
              min: 6,
              max: 10,
            },
          ]}
        >
          <Input placeholder="Номер" />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker placeholder="Дата" />
        </Form.Item>
        <Form.Item name="role" initialValue={"1"}>
          <Select
            placeholder="Роль"
            options={[
              {
                value: "1",
                label: (
                  <Typography fontSize={14} level="body1">
                    Админ
                  </Typography>
                ),
              },
              {
                value: "2",
                label: (
                  <Typography fontSize={14} level="body1">
                    Пользователь
                  </Typography>
                ),
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default memo(Registration);
