import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '@mui/joy/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
const Header = () => {

  const [state, setState] = useState({
    login: {
      loading: true
    }
  })


  const session = useSession()
  const signInHandler = async () => {
    return await signIn('credentials', {
      redirect: false,
      email: 'a',
      password: 'a',
    });
  }

  const clickHandler = async () => {
    session.data ? signOut() : signInHandler()
  }

  return (
    <header>
      <Button
        size="sm"
        // loading={state.login.loading}
        variant="outlined"
        endDecorator={
          session.data ?
            <LogoutIcon /> :
            <LoginIcon />
        }
        onClick={clickHandler}
      >
        {session.data ? <>signOut</> : <>signIn</>}
      </Button>
    </header>
  )
}

export default Header