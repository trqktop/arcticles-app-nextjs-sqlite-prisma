import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '@mui/joy/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';



const LoginForm = () => {
  const session = useSession()
  const [open, setOpen] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const clickHandler = async () => {
    setOpen(true)
  }

  const submitHandler = () => {
    signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    }).then(res => {
      if (res?.ok)
        closeModal()
      else {
        setError(true)
      }
    })
  }

  const closeModal = () => {
    setOpen(false);
    setError(false)
    setEmail('');
    setPassword('');
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  if (!session.data)
    return <React.Fragment>
      <Button
        style={{ marginLeft: 'auto' }}
        color="neutral"
        variant="outlined"
        endDecorator={
          <LoginIcon />
        }
        onClick={clickHandler}
      >
        login
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Авторизация
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Введите почту и пароль
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              submitHandler()
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>email</FormLabel>
                <Input error={error} autoFocus required value={email} onChange={handleEmailChange} />
              </FormControl>
              <FormControl>
                <FormLabel>password</FormLabel>
                <Input error={error} required type='password' value={password} onChange={handlePasswordChange} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  return null
}

export default LoginForm