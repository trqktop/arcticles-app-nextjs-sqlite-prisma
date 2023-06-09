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
    <Card style={{ margin: "auto" }} >
      <Form
        disabled={loading}
        size='large'
        layout='vertical'
        name="login"
        labelCol={{ span: 7 }}
        autoComplete="off"
        onFinish={submitHandler}
      >
        <Form.Item
          label={<Typography level='body1'>Почта</Typography>}
          // hasFeedback
          name="email"
          help={errorStatus ? "Неверный логин или пароль" : null}
        // rules={[
        //   {
        //     required: true,
        //     type: "email",
        //     message: "Поле должно быть формата name@domen.ru",
        //   },
        // ]}
        >
          <Input status={errorStatus} />
        </Form.Item>
        <Form.Item
          label={<Typography level='body1'>Пароль</Typography>}
          name="password"
          // hasFeedback
          help={errorStatus ? "Неверный логин или пароль" : null}
        // rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input.Password status={errorStatus} />
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
