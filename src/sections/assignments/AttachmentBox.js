import React from 'react'
import {styled, Box} from '@mui/material'



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

const AttachmentBox = ({data}) => {
  return (
    <>
        <AttachmentBoxRight>
            {data}
        </AttachmentBoxRight>
    </>
  )
}

export default AttachmentBox