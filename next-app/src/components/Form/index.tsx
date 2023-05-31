import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import { IconButton, Textarea } from '@mui/joy';
import { useSession, getCsrfToken } from "next-auth/react";


export default function Form({ create, post }: { create: boolean, post?: any }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const session = useSession();
console.log(session)
  const modalTitle = create ? 'Добавить статью' : 'Редактировать статью'
  return (
    <React.Fragment>
      {/* <IconButton aria-label='edit' color="primary" onClick={() => setOpen(true)}> */}
      {create ? <IconButton aria-label='edit' color="primary" onClick={() => setOpen(true)}> <Add /> </IconButton> : <Edit color="primary" onClick={() => setOpen(true)} />}
      {/* </IconButton> */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: '900px' }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            {modalTitle}
          </Typography>
          {/* <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the project.
          </Typography> */}
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Заголовок</FormLabel>
                <Input autoFocus required defaultValue={create ? '' : post.title} />
              </FormControl>
              <FormControl>
                <FormLabel>Текст</FormLabel>
                <Textarea maxRows={4} required defaultValue={create ? '' : post.content} />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}