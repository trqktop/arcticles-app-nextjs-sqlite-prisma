import { signIn, useSession } from "next-auth/react";
import Button from "@mui/joy/Button";
import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import LoginMenu from "../LoginMenu";

const LoginForm = () => {
  const session = useSession();
  const [open, setOpen] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [ctx, setCtx] = React.useState<number>(0);

  const clickHandler = async () => {
    setOpen(true);
  };

  const registrationHandler = () => {
    clickHandler();
    setCtx(1);
  };
  const loginHandler = () => {
    clickHandler();
    setCtx(2);
  };

  const submitHandler = async () => {
    if (ctx > 0 && ctx === 2)
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      }).then((res) => {
        if (res?.ok) closeModal();
        else {
          setError(true);
        }
      });
    if (ctx > 0 && ctx === 1) {
      const data = { email, password };
      await fetch("http://localhost:3000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      }).then((res) => {
        if (res?.ok) closeModal();
        else {
          setError(true);
        }
      });
    }
    setCtx(0);
  };

  const closeModal = () => {
    setOpen(false);
    setError(false);
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const modalTitle = ctx === 1 ? "Регистрация" : ctx === 2 ? "Авторизация" : "";

  if (!session.data)
    return (
      <React.Fragment>
        <LoginMenu />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ margin: "auto" }}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              {modalTitle}
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              textColor="text.tertiary"
            >
              Введите почту и пароль
            </Typography>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                submitHandler();
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>email</FormLabel>
                  <Input
                    error={error}
                    autoFocus
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>password</FormLabel>
                  <Input
                    error={error}
                    required
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
  return null;
};

export default LoginForm;
