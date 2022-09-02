import React from 'react'
import { Box, Container,Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Page from '../components/Page'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import user, { clear } from 'src/redux/user';
import { useState } from "react"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BackEndUrl } from "../url";
import { clearToken } from 'src/redux/fbToken';


const Logout = () => {
  const { fbToken } = useSelector(state => state.fbToken);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    user.role === "admin" ? navigate("/dashboard/admin") : navigate("/dashboard/user");
  };
 const removeToken = async() => {
    try {
      const res = await axios.post(`${BackEndUrl}/api/token/remove`, {
        token: fbToken.fbTokenClient,
      },
      {
        headers: {
              token: user.token,
        }
      }
      );
      if (res) {
      }
      
    } catch (error) {
      console.error('Error Removing Token: ', error);
      
    }
 }
  const handleLogout = async(e) => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('lastName');
    window.localStorage.removeItem('phone');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('firstName');
    window.localStorage.removeItem('deadline');
    window.localStorage.removeItem('assignId');
    window.localStorage.removeItem('fbToken');
    removeToken();
    dispatch(clear());
    dispatch(clearToken());
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