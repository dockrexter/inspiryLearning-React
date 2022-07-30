import React from 'react'
import { Typography, Stack, Button, Card, Fab, TextField, Box, Grid, styled } from '@mui/material';
import io from 'socket.io-client'
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Paper from 'src/theme/overrides/Paper';
// const socket = io.connect('http://localhost:8000');
import SendIcon from '@mui/icons-material/Send'


// const ChatBox=styled(Box)(({theme}) => ({
//     width: '50%',
//     float: 'right',
//     padding: '1vmax',
//     margin: '1vmax',
//     display: 'inline-block',
//     clear: 'both'
// }));
// const RightMessage = styled(Paper)(({theme})=>({
//     background: "#E7F4F0",
//     boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
//     borderRadius: "8.03922px", width: "80%", padding: 2, 
// }))

const Chat = () => {

    const socketRef = useRef()
    const [stat, setStat] = useState({message: ''});
    const [chat, setChat] = useState([]);
    useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8000")
			socketRef.current.on("message", ({ message }) => {
				setChat([ ...chat, { message } ])
                console.log(message)
			})
			return () => socketRef.current.disconnect()
		},
		[chat])
    const onTextChange = e =>{
        setStat({ ...stat, [e.target.name]: e.target.value })
    }
        const onMessageSubmit = (e) => {
        e.preventDefault();
		const {message} = stat
		socketRef.current.emit("message", {message})
		setStat({ message: "",})
	}
   const renderChat = () => {
        return chat.map(({message}, index ) => (
            <Card sx={{
                background: "#E7F4F0",
                boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
                borderRadius: "8.03922px", width: "80%", padding: 1,
                }}>
            <Typography variant='body2' noWrap sx={{
                            fontFamily: 'Poppins',
                            width:'200px',
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "14.0784px",
                            lineHeight: "21px",
                            color: "#4F433C",
                            opacity: 0.7,
                         }}>
                {message}  
                </Typography>
                </Card>
        ))
    }

    return (
        <>
        <Stack direction="column" spacing={1} sx={{ display: "flex", overflowY: "scroll", width: "100%",height: "70vh", alignItems: "flex-end", padding: 2, justifyContent:"center" }}>
            <>
                {renderChat()}   
            </>
        </Stack>
        <Fab variant="extended" size="large" color="primary" aria-label="add" sx={{
            marginRight: "25px",
            position: 'absolute',
            bottom: 16,
            right: 70,
            padding: 4,

        }}>
            <form onSubmit={onMessageSubmit}>
                <Stack direction="row" spacing={2} sx={{
                    display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                    <img alt="camera" src="/static/camera.svg" width={30} height={30} />
               
                    <TextField label="Type Your Message"  variant="filled" name="message" onChange={e => onTextChange(e)}
                    value={stat.message}
                    sx={{
                        opacity: 0.8
                        }}> </TextField>
                        {stat.message ? <Button type='submit'><SendIcon/></Button> : <Button><SendIcon/></Button>}
                       
            </Stack>
            </form>
        </Fab>
        </>
    );


}

export default Chat;

//<img alt="send" src="/static/send.svg" width= {25} height={25} />
//<img alt="attachment" src="/static/attachment.svg" width={30} height={30} />