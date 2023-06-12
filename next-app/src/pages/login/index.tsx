import { signIn } from "next-auth/react";
import { useState } from "react";
import { Form, Input, Button, Layout } from "antd";
import { Box, Card, Typography } from "@mui/joy";
type FormData = {
  email: string;
  password: string;
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setError] = useState<any>("");
  const submitHandler = async (form: FormData) => {
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    }).then(({ ok, error }: any) => {
      if (error) {
        setError("error");
      }
      setLoading(false);
    });
  };

  return (
    <Card style={{ margin: "auto", width: '320px' }} >
      <Form
        disabled={loading}
        size='large'
        name="login"
        autoComplete="off"
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          help={errorStatus ? "Неверный логин или пароль" : null}
        >
          <Input placeholder="Почта" status={errorStatus} />
        </Form.Item>
        <Form.Item
          name="password"
          help={errorStatus ? "Неверный логин или пароль" : null}
        >
          <Input.Password placeholder="Пароль" status={errorStatus} />
        </Form.Item>
        <Form.Item >
          <Button loading={loading} type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
