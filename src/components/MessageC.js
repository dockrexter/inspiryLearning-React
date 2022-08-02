import React from 'react'
import { Box, styled } from '@mui/material'
import { useSelector } from 'react-redux';





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
const MessageC = ({data}) => {
  const { user } = useSelector(state => state.user);
  return (
    <>
    {user.user_id === data.user_id ? <MsgBoxLeft>{data.message}</MsgBoxLeft> : <MsgBoxRight>{data.message}</MsgBoxRight> }
    </>
  )
}

export default MessageC