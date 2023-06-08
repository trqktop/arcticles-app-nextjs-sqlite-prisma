import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useSession } from "next-auth/react";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/joy";
import { PostContext } from "@/pages/_app";
import { Button, Checkbox, Form, Input, Upload, UploadFile } from "antd";
import { InboxOutlined, UploadOutlined } from "@mui/icons-material";
import type { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
const { Dragger } = Upload;
const { TextArea } = Input;

function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Content = base64String.split(",")[1];
      resolve(base64Content);
    };
    reader.onerror = (error) => reject(error);
  });
}

const CrudForm = ({
  icon,
  type,
  title,
  data,
  updateHandler,
}: {
  icon: any;
  type: "create" | "update";
  title: string;
  data?: any;
  updateHandler: any;
}) => {
  const session = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const postTitle = type === "update" ? data.title : "";
  const postContent = type === "update" ? data.content : "";



  const onFinish = async ({
    title,
    content,
    dataFile
  }: {
    title: string;
    content: string;
    dataFile: any
  }) => {


    if (dataFile) {
      const { file } = dataFile
      const base64Content = await encodeFileToBase64(file);
      fetch("/api/file/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: base64Content, name: file.name }),
      }).then(res => res.json()).then(fileId => {
        updateHandler({
          title,
          content,
          type,
          fileId: fileId.id,
          id: data?.id,
          authorId: session.data?.user.id!,
        });
        setOpen(false);
      })
    } else {
      updateHandler({
        title,
        content,
        type,
        id: data?.id,
        authorId: session.data?.user.id!,
      });
      setOpen(false);
    }
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
              <Form.Item name="dataFile">
                <Upload beforeUpload={() => false} fileList={[]} multiple={false} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
  return null;
};

export default CrudForm;
