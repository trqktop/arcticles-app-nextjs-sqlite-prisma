import { Button, Form, Input, Select } from "antd";
import { signIn } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const Registration = () => {
  const submitHandler = async (form: FormData) => {
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
        name="registration"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="surname"
          name="surname"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="lastname" name="lastname">
          <Input />
        </Form.Item>

        <Form.Item label="serial" name="serial">
          <Input />
        </Form.Item>

        <Form.Item label="number" name="number">
          <Input />
        </Form.Item>

        <Form.Item label="role" name="role" initialValue={"1"}>
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
