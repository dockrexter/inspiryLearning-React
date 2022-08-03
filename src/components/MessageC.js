import React from 'react'
import { Box, styled } from '@mui/material'
import { useSelector } from 'react-redux';
import Typography from 'src/theme/overrides/Typography';



//.............CHAT STYLING............//

const MsgBoxRight = styled(Box)(({theme})=> ({
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
const MsgBoxLeft = styled(Box)(({theme})=>({
  backgroundColor: "#D3D3D3",
    padding: "1vmax",
    margin: "1vmax",
    borderRadius: "0.5vmax",
    display: "inline-block",
    width: "70%",
    clear: "both",
    float: "left",
    wordWrap:"break-word"

}))

//.................MAIN FUCTION..............//

const MessageC = ({data}) => {
  const { user } = useSelector(state => state.user);
  console.log(user.user_id, "This is user id");
  console.log(data.user_id,"This is Database User ID")
  console.log(user.firstname, "User Name");
  return (
    <>
    {user.user_id === data.user_id ? <MsgBoxRight>{data.message}</MsgBoxRight> : <MsgBoxLeft>{data.message}</MsgBoxLeft>  }
    </>
  )
}

export default MessageC