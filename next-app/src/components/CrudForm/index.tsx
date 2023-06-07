import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useSession } from "next-auth/react";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/joy";
import { PostContext } from "@/pages";
import { Button, Checkbox, Form, Input } from "antd";
const { TextArea } = Input;

const CrudForm = ({
  icon,
  type,
  title,
  data,
}: {
  icon: any;
  type: "create" | "update";
  title: string;
  data?: any;
}) => {
  const session = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const postTitle = type === "update" ? data.title : "";
  const postContent = type === "update" ? data.content : "";
  const { updatePostHandler } = React.useContext(PostContext);
  const onFinish = async ({ title, content }: any) => {
    updatePostHandler({
      title,
      content,
      type,
      id: data?.id,
      authorId: session.data?.user.id!,
    });
    setOpen(false);
  };

  if (session.data?.user.role === "1")
    return (
      <React.Fragment>
        <Tooltip title={title}>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            {icon}
          </IconButton>
        </Tooltip>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog style={{ maxWidth: 600 }}>
            <Form
              name="curd"
              layout="vertical"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                hasFeedback
                label="Заголовок"
                name="title"
                initialValue={postTitle}
                rules={[
                  {
                    message: "Минимальное количество символов 5",
                    min: 5,
                    required: true,
                  },
                  {
                    max: 200,
                    message: "Максимаьное количество символов 200",
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hasFeedback
                label="Статья"
                name="content"
                initialValue={postContent}
                rules={[
                  {
                    message: "Минимальное количество символов 10",
                    min: 10,
                    required: true,
                  },
                  {
                    max: 500,
                    message: "Максимаьное количество символов 500",
                    required: true,
                  },
                ]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
  return null;
};

export default React.memo(CrudForm);
