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
import fbToken, { clearToken } from 'src/redux/fbToken';
import { clearAssignment } from 'src/redux/assignments';


const Logout = () => {
  const  fbToken = JSON.parse(window.localStorage.getItem('insp_LEARN_fbToken')) 
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
        token: fbToken
      },
      {
        headers: {
              token: user.token,
        }
      }
      ); 
      if(res){
       // console.log("token removed Successfully=>",res)
      }
    } catch (error) {
      console.error(error);
      
    }
 }
  const handleLogout = async(e) => {
    window.localStorage.removeItem('insp_LEARN_token');
    window.localStorage.removeItem('insp_LEARN_id');
    window.localStorage.removeItem('insp_LEARN_lastName');
    window.localStorage.removeItem('insp_LEARN_phone');
    window.localStorage.removeItem('insp_LEARN_email');
    window.localStorage.removeItem('insp_LEARN_role');
    window.localStorage.removeItem('insp_LEARN_firstName');
    window.localStorage.removeItem('insp_LEARN_deadline');
    window.localStorage.removeItem('insp_LEARN_assignId');
    window.localStorage.removeItem('insp_LEARN_fbToken');
    removeToken();
    dispatch(clear());
    dispatch(clearToken());
    dispatch(clearAssignment());
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
          <Typography>LOGOUT</Typography>
        </DialogTitle>
        <DialogContent>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
            <LogoutIcon/>
            Are you sure you want to logout?
            </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>Cancle</Button>
          <Button variant='contained' onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
        </Container>
    </Page>
  )
}

export default Logout