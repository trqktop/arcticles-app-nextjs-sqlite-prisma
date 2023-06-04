import CrudForm from '../CrudForm';
import LoginForm from '../LoginForm';
import Profile from '../Profile';
import Add from '@mui/icons-material/Add';
const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <LoginForm />
      <CrudForm icon={<Add />} type='create' />
      <Profile />
    </header>
  )
}

export default Header