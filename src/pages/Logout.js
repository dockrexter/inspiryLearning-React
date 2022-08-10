import React from 'react'
import { Box, Container,Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Page from '../components/Page'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import user, { clear } from 'src/redux/user';
import { useState } from "react"
import { useSelector } from 'react-redux';


const Logout = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    user.role === "admin" ? navigate("/dashboard/admin") : navigate("/dashboard/user");
  };

  const handleLogout = async(e) => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    window.localStorage.removeItem('lastname');
    window.localStorage.removeItem('phone');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('firstname');
    dispatch(clear());
    navigate("/home", { replace: true });
  }
  return (
    <Page title="Logout" sx={{width: "100%", height: "100%"}}>
        <Container sx={{ width: "100%"}}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <Typography variant="h5">LOGOUT</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
            <LogoutIcon/>
            Are you sure you want to logout?
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancle</Button>
          <Button variant='contained' onClick={handleLogout}>
            LogOut
          </Button>
        </DialogActions>
      </Dialog>
        </Container>
    </Page>
  )
}

export default Logout