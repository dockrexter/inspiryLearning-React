import React from 'react'
import { Box,Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BackEndUrl } from 'src/url';
import { useSelector } from 'react-redux';

const DialogReject = ({open, close, id}) => {
    const { user } = useSelector(state => state.user);

   const handlePaymentReject =async() =>{
    const toastid = toast.loading("Please wait...");
    try {
      const res = await axios.post(`${BackEndUrl}/api/payment/reject`,{
        messageId: id,
      },
      {
        headers: {
          token: user.token
        }
      });
      if (res){
        toast.update(toastid, {isLoading: false, autoClose: 10});
        close();
       //  console.log("Rejected Successfully: ",res)
      }
      
    } catch (error) {
      toast.update(toastid, { render: "Can't perform action right now\nTry Again", type: "error", isLoading: false, autoClose: 1000, });
      console.error("Rejection Error: ", error)
      close();
    }

    }
  return (
    <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={close}>
      <DialogTitle>
        <Typography>Reject Offer</Typography>
      </DialogTitle>
      <DialogContent>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}>
          Are you sure you want to Reject this Offer?
          </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={close}>Cancel</Button>
        <Button variant='contained' onClick={()=>handlePaymentReject()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogReject