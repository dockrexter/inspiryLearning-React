import React from 'react'
import { Box, styled } from '@mui/material'




const MsgBox = styled(Box)(({theme})=> ({
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
const MessageC = ({message}) => {
  return (
    <MsgBox>
        {message}
    </MsgBox>
  )
}

export default MessageC