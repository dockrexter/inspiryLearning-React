import React from 'react'
import { Box, Button, styled, Typography, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import moment from 'moment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ImageConfig } from '../ImageConfig';
import { BackEndUrl } from 'src/url';
import axios from 'axios';
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify';
import { useState } from 'react';
import DialogReject from './DialogReject';
import { useEffect } from 'react';

//.............CHAT STYLING............//
const AttachmentBoxRight = styled(Box)(({theme})=> ({
  backgroundColor: "#E7F4F0",
  padding: "1vmax",
  margin: "1vmax",
  borderRadius: "0.5vmax",
  display: "inline-block",
  width: "70%",
  clear: "both",
  float: "right",
  wordWrap:"break-word",
  boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)"
}))
const AttachmentBoxLeft = styled(Box)(({theme})=> ({
  backgroundColor: "#FFFFFF",
  padding: "1vmax",
  margin: "1vmax",
  borderRadius: "0.5vmax",
  display: "inline-block",
  width: "70%",
  clear: "both",
  float: "left",
  wordWrap:"break-word",
  boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)"
}))

const MsgBoxRight = styled(Box)(({theme})=> ({
    backgroundColor: "#E7F4F0",
    padding: "1vmax",
    margin: "1vmax",
    borderRadius: "8.03922px",
    display: "inline-block",
    width: "70%",
    clear: "both",
    float: "right",
    wordWrap:"break-word",
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
    background: "#E7F4F0",
}))
  const OfferBoxRight = styled(Box)(({theme})=> ({
  backgroundColor: "#E7F4F0",
  padding: "1vmax",
  margin: "1vmax",
  borderRadius: "8.03922px",
  display: "inline-block",
  width: "70%",
  clear: "both",
  float: "right",
  wordWrap:"break-word",
  boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
  background: "#E7F4F0",
}))
const MsgBoxLeft = styled(Box)(({theme})=>({
  backgroundColor: "#FFFFFF",
    padding: "1vmax",
    margin: "1vmax",
    borderRadius: "8.03922px",
    display: "inline-block",
    width: "70%",
    clear: "both",
    float: "left",
    wordWrap:"break-word",
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",

}))
const OfferBoxLeft = styled(Box)(({theme})=>({
  backgroundColor: "#FFFFFF",
    padding: "1vmax",
    margin: "1vmax",
    borderRadius: "8.03922px",
    display: "inline-block",
    width: "70%",
    clear: "both",
    float: "left",
    wordWrap:"break-word",
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",

}))

export const MsgText = styled(Typography)(({theme})=>({
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14.0784px",
    lineHeight: "21px",
    color: "#4F433C",
    opacity: 0.9
}))
 export const MsgDate = styled(Typography)(({theme})=>({
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10.8628px",
        textAlign: "right",
        color: "#1E1100",
        opacity: 0.5
  }))   
  
 export const AttachmentText = styled(Typography)(({theme})=>({
    fontFamily: 'Poppins',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "10.8628px",
    textAlign: "left",
    color: "#1E1100",
    opacity: 0.5 

  }))

              
export const AttachmentSize = styled(Typography)(({theme})=>({
  fontFamily: 'Poppins',
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10.8628px",
  textAlign: "right",
  color: "#1E1100",
  opacity: 0.5
}))

const OfferAmmount = styled(Typography)(({theme})=>({
    fontFamily: 'Poppins',
    fontStyle: "bold",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "21px",
    color: "black",
    marginRight: "1vmax"
}))
//.................MAIN FUCTION..............//

const MessageC = ({data, paymentStatus}) => {
  const { user } = useSelector(state => state.user);
  const {assignment} = useSelector(state => state.assignment);
  const [openRecject, setOpenReject] = useState(false);
  const [messageIdR, setMessageIdR] = useState(null);


  const handleDownloadfile = async(url, filename) => {
    const toastid = toast.loading("Please wait...")
    try {
      
    const res = await axios.get(`${BackEndUrl}${url}`, {
      responseType: 'blob',
    });
    if(res) {
      toast.update(toastid, {isLoading: false,autoClose:10});
      fileDownload(res.data, filename)
    }
  } catch (error) {
    toast.update(toastid, {render: "Can't get file right now", type: "error",isLoading: false})
    console.error("ATTACHMENT DOWNLOAD ERROR: ", error);    
  }
 }


  const handlePay = async(amount, message, id) =>{
    const toastid = toast.loading("Please wait...")
    try {
      const res = await axios.post(`${BackEndUrl}/api/payment/pay`, {
        itemName: "Assignment Payment",
        price: amount,
        currency: "USD",
        description: message,
        messageId: id,
        assignmentId: assignment.id

      },
  {
    headers: {
      token: user.token
    }
  },
      );
      if (res){
        toast.update(toastid, {isLoading: false, autoClose: 10});
        window.open(res.data.data.url, '_blank').focus();
        paymentStaus();

      }
    } catch (error) {
      console.error("Something went wrong: ", error);
      toast.update(toastid, { render: "Can't get Payment link\nRight Now", type: "error", isLoading: false, autoClose: 1000});
      
    }
  }

  const handleRecjectClose = () =>{
    setOpenReject(false);
  }
  const handlereject= async(id)=>{
    setOpenReject(true);
    setMessageIdR(id);
  }
  return (
    <>
    {data.type === 0 && user.id === data.userId 
    ? 
    <MsgBoxRight>
      <MsgText variant='body2'>{data.message}</MsgText>
      <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate>
    </MsgBoxRight> 
    : 
    data.type === 0 && user.id !== data.userId
    ? 
    <MsgBoxLeft>
      <MsgText variant='body2'>{data.message}</MsgText>
      <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate>
    </MsgBoxLeft> 
    : 
    data.type === 2 && user.id === data.userId
    ? 
    <AttachmentBoxRight>
      <AttachmentText>Attachment</AttachmentText>
                    <Box sx={{display: "flex",borderRadius: "8.03922px", alignItems:"center",  wordWrap:"break-word", margin: "5px 5px", backgroundColor:"#DCE9E5", justifyContent: "space-between" }}>
                      <Box sx={{width: "10%", height: "10%"}}>
                        <img src={ImageConfig['default']} alt="Attachment"/>
                      </Box>
                       <MsgText variant='body2'>{data.fileName}</MsgText>
                    <IconButton onClick={()=>handleDownloadfile(data.url, data.fileName)}
                    ><DownloadForOfflineIcon/></IconButton>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                      <AttachmentSize>{Math.round(data.fileSize/1024)}KB</AttachmentSize>
                      <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate>
                    </Box>
    </AttachmentBoxRight> 
    : data.type === 2 && user.id !== data.userId
    ? 
    <AttachmentBoxLeft>
      <AttachmentText>Attachment</AttachmentText>
                    <Box sx={{display: "flex",borderRadius: "8.03922px", alignItems:"center",  wordWrap:"break-word", margin: "5px 5px", backgroundColor:"#DCE9E5", justifyContent: "space-between" }}>
                      <Box sx={{width: "50px", height: "60px"}}>
                        <img src={ImageConfig['default']} alt="Attachment"/>
                      </Box>
                      <MsgText>{data.fileName}</MsgText>
                    <IconButton
                      onClick={()=>handleDownloadfile(data.url, data.fileName)}
                    ><DownloadForOfflineIcon/></IconButton>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                      <AttachmentSize>{Math.round(data.fileSize/1024)}KB</AttachmentSize>
                      <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate>
                    </Box>
    </AttachmentBoxLeft> 
    : 
    data.type === 1 && user.id === data.userId
    ? 
    <OfferBoxRight>
      <AttachmentText>Offer</AttachmentText>
        <Box sx={{display: "flex", alignItems:"center",  wordWrap:"break-word", margin: "0 5px"}}>
          <OfferAmmount variant='body2'>${data.amount}</OfferAmmount>
          <MsgText variant='body2' >{data.message}</MsgText>
        </Box>
        <Box sx={{display: "flex", alignItems:"end", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between" }}>
          {data.paymentStatus === 0?
                        <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                          <Button onClick={()=>handlereject(data.id)}>WithDraw</Button>
                        </Box>
                        : data.paymentStatus === 1?<AttachmentSize>Paid</AttachmentSize> :<AttachmentSize>Rejected/Withdrawed</AttachmentSize>}
          </Box>
          <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate>
        </Box>
    </OfferBoxRight> 
    : 
    data.type === 1 && user.id !== data.userId
    ? 
    <OfferBoxLeft>
      <AttachmentText>Offer</AttachmentText>
       <Box sx={{display: "flex", alignItems:"center"}}>
                      <OfferAmmount variant='body2'>${data.amount}</OfferAmmount>
                       <MsgText variant='body2'>{data.message}</MsgText>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"end", justifyContent: "space-between"}}>
                        {data.paymentStatus === 0?
                        <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                          <Button onClick={()=>handlePay(data.amount, data.message, data.id)}>Pay</Button>
                          <Button onClick={()=>handlereject(data.id)}>Reject</Button> 
                        </Box>
                        : data.paymentStatus === 1?<AttachmentSize>Paid</AttachmentSize> :<AttachmentSize>Rejected/withdrawed</AttachmentSize>} 
      <MsgDate>{moment(data.createdAt).format('MMM DD YY hh:mm')}</MsgDate></Box>
    </OfferBoxLeft> 
    : <Box sx={{display: "none"}}></Box>}
    <DialogReject open={openRecject} close={handleRecjectClose} id={messageIdR} paymentStatus={paymentStatus}/>
    </>
  )
}

export default MessageC