import { Button, Form, Input, Select } from "antd";
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

  return (
    <div style={{ margin: "auto" }}>
      <Form
        disabled={loading}
        name="registration"
        labelCol={{ span: 8 }}
        layout="horizontal"
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
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
          label="password"
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
          label="surname"
          name="surname"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Фамилия должна содержать от 2 до 16 символов",
              min: 2,
              max: 16,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="name"
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
          label="lastname"
          name="lastname"
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
          label="serial"
          name="serial"
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
          label="номер"
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

        <Form.Item hasFeedback label="role" name="role" initialValue={"1"}>
          <Select
            options={[
              {
                value: "1",
                label: "admin",
              },
              {
                value: "2",
                label: "user",
              },
            ]}
          />
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

export default Registration;
