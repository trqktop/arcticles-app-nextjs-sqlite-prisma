import { signIn } from "next-auth/react";
import { useState } from "react";
import { Form, Input, Button } from "antd";
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
    <div style={{ margin: "auto" }}>
      <Form
        disabled={loading}
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item
          label="Email"
          hasFeedback
          name="email"
          help={errorStatus ? "Неверный логин или пароль" : null}
          rules={[
            {
              required: true,
              type: "email",
              message: "Поле должно быть формата name@domen.ru",
            },
          ]}
        >
          <Input status={errorStatus} />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          hasFeedback
          help={errorStatus ? "Неверный логин или пароль" : null}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input.Password status={errorStatus} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
