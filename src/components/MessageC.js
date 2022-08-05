import React from 'react'
import { Box, styled } from '@mui/material'
import { useSelector } from 'react-redux';



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
  wordWrap:"break-word"
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

//.................MAIN FUCTION..............//

const MessageC = ({data}) => {
  const { user } = useSelector(state => state.user);
  // console.log(user.user_id, "This is user id");
  // console.log(data.user_id,"This is Database User ID");
  // console.log(data.admin_id,"This is Message");
  //  console.log(data, "Message Format");
  return (
    <>
    {data.message? user.user_id === data.user_id ||  user.user_id === data.admin_id ? <MsgBoxRight>{data.message}</MsgBoxRight> : <MsgBoxLeft>{data.message}</MsgBoxLeft>  : null}
    </>
  )
}

export default MessageC