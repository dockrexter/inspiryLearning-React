import React from 'react'
import { Box, Button, styled, Typography, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import moment from 'moment';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ImageConfig } from '../ImageConfig';

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

//.................MAIN FUCTION..............//

const MessageC = ({data}) => {
  const { user } = useSelector(state => state.user);
  return (
    <>
    {data.type === 0 && (user.user_id === data.user_id ||  user.user_id === data.admin_id) 
    ? 
    <MsgBoxRight>
      <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",
                        opacity: 0.9
                    }}>{data.message}</Typography>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "right",
                    color: "#1E1100",
                    opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography>
    </MsgBoxRight> 
    : 
    data.type === 0 && (user.user_id !== data.admin_id && user.user_id !== data.user_id)
    ? 
    <MsgBoxLeft>
      <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",
                        opacity: 0.9
                    }}>{data.message}</Typography>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "right",
                    color: "#1E1100",
                    opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography>
    </MsgBoxLeft> 
    : 
    data.type === 2 && (user.user_id === data.user_id || user.user_id === data.admin_id)
    ? 
    <AttachmentBoxRight>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "left",
                    color: "#1E1100",
                    opacity: 0.5 }}>Attachment</Typography>
                    <Box sx={{display: "flex",borderRadius: "8.03922px", alignItems:"center",  wordWrap:"break-word", margin: "5px 5px", backgroundColor:"#DCE9E5", justifyContent: "space-between" }}>
                      <Box sx={{width: "50px", height: "60px"}}>
                        <img src={ImageConfig['default']} alt="Attachment"/>
                      </Box>
                       <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",

                        opacity: 0.9
                    }}>{data.file_name}</Typography>
                    <IconButton
                      href={`${data.download_url}`}
                      download
                    
                    ><DownloadForOfflineIcon/></IconButton>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                      <Typography sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10.8628px",
                        textAlign: "right",
                        color: "#1E1100",
                        opacity: 0.5 }}>{Math.round(data.file_size/1024)}KB</Typography>
                      <Typography sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10.8628px",
                        textAlign: "right",
                        color: "#1E1100",
                        opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography>
                    </Box>
    </AttachmentBoxRight> 
    : data.type === 2 && user.user_id !== data.admin_id && user.user_id !== data.admin_id
    ? 
    <AttachmentBoxLeft>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "left",
                    color: "#1E1100",
                    opacity: 0.5 }}>Attachment</Typography>
                    <Box sx={{display: "flex",borderRadius: "8.03922px", alignItems:"center",  wordWrap:"break-word", margin: "5px 5px", backgroundColor:"#DCE9E5", justifyContent: "space-between" }}>
                      <Box sx={{width: "50px", height: "60px"}}>
                        <img src={ImageConfig['default']} alt="Attachment"/>
                      </Box>
                       <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",

                        opacity: 0.9
                    }}>{data.file_name}</Typography>
                    <IconButton
                      href={`${data.download_url}`}
                      download
                    
                    ><DownloadForOfflineIcon/></IconButton>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                      <Typography sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10.8628px",
                        textAlign: "right",
                        color: "#1E1100",
                        opacity: 0.5 }}>{Math.round(data.file_size/1024)}KB</Typography>
                      <Typography sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10.8628px",
                        textAlign: "right",
                        color: "#1E1100",
                        opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography>
                    </Box>
    </AttachmentBoxLeft> 
    : 
    data.type === 1 && (user.user_id === data.user_id || user.user_id === data.admin_id)
    ? 
    <OfferBoxRight>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "left",
                    color: "#1E1100",
                    opacity: 0.5 }}>Offer</Typography>
                    <Box sx={{display: "flex", alignItems:"center",  wordWrap:"break-word", margin: "0 5px"}}>
                      <Typography variant='body2' sx={{
                          fontFamily: 'Poppins',
                          fontStyle: "bold",
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "21px",
                          color: "black",
                          marginRight: "1vmax"
                      }}>${data.amount}</Typography>
                       <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",

                        opacity: 0.9
                    }}>{data.message}</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"end", justifyContent: "space-between"}}>
                      <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                        <Button>WithDraw</Button> 
                      </Box>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "right",
                    color: "#1E1100",
                    opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography></Box>
    </OfferBoxRight> 
    : 
    data.type === 1 && (user.user_id !== data.admin_id && user.user_id !== data.admin_id)
    ? 
    <OfferBoxLeft>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "left",
                    color: "#1E1100",
                    opacity: 0.5 }}>Offer</Typography>
       <Box sx={{display: "flex", alignItems:"center"}}>
                      <Typography variant='body2' sx={{
                          fontFamily: 'Poppins',
                          fontStyle: "bold",
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "21px",
                          color: "black",
                          marginRight: "2vmax"
                      }}>${data.ammount}</Typography>
                       <Typography variant='body2' sx={{
                        fontFamily: 'Poppins',
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.0784px",
                        lineHeight: "21px",
                        color: "#4F433C",
                        opacity: 0.9
                    }}>{data.message}</Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems:"end", justifyContent: "space-between"}}>
                      <Box sx={{display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                        <Button>Pay</Button> 
                        <Button>Reject</Button>
                      </Box>
      <Typography sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10.8628px",
                    textAlign: "right",
                    color: "#1E1100",
                    opacity: 0.5 }}>{moment(data.time_stamp).format('MMM DD YY')}</Typography></Box>
    </OfferBoxLeft> 
    : <Box sx={{display: "none"}}></Box>}
    </>
  )
}

export default MessageC