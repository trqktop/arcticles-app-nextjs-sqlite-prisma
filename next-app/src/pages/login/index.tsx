import { signIn } from "next-auth/react";
import { memo, useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
import { Card } from "@mui/joy";
import type InputProps from "@mui/joy";
type FormData = {
  email: string;
  password: string;
};
type ErrorStatus = "" | "warning" | "error" | undefined;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setError] = useState<ErrorStatus>("");

  const submitHandler = useCallback(async (form: FormData) => {
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
  }, []);

  return (
    <Card style={{ margin: "auto", width: "320px" }}>
      <Form
        disabled={loading}
        size="large"
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
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default memo(Login);
