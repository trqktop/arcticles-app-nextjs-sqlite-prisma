import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useSession } from 'next-auth/react';
import { IconButton } from '@mui/material';
import { Tooltip, Textarea } from '@mui/joy';


export default function CrudForm({ icon, type, data }: { icon: any, type: 'create' | 'update', data?: any }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const title = type === 'update' ? data.title : ''
    const content = type === 'update' ? data.content : ''

    const session = useSession()
    if (session?.data?.user?.role === '1')
        return (
            <React.Fragment>
                <Tooltip title={type + ' post'} >
                    <IconButton color="primary" onClick={() => setOpen(true)}>
                        {icon}
                    </IconButton>
                </Tooltip>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{ maxWidth: 500 }}
                    >
                        <Typography id="basic-modal-dialog-title" component="h2">
                            Create new project
                        </Typography>
                        <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
                            Fill in the information of the project.
                        </Typography>
                        <form
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input autoFocus required defaultValue={title} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea maxRows={3} required defaultValue={content} />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        );
    return null
}