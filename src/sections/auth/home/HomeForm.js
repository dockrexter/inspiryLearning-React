
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import { Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../redux/user';
import Iconify from '../../../components/Iconify';
import { BackEndUrl } from "../../../url";

// ----------------------------------------------------------------------

export default function HomeForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();






  return (
    <Stack spacing={3}>
      <Button variant="contained" size="large" color="primary" onClick={() => {
        window.localStorage.setItem('role', JSON.stringify("user"));
        dispatch(update({
          role: "user", 
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          user_id: "",
          token: "",
        }));

        navigate('/login')
      }}>
        Login as User
      </Button>
      <Button variant="contained" size="large" color="secondary" onClick={() => {
        window.localStorage.setItem('role', JSON.stringify("admin"));
        dispatch(update({
          role: "admin",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          user_id: "",
          token: "",
        }));

        navigate('/login')
      }}>
        Login as Admin
      </Button>
    </Stack>


  );
}
