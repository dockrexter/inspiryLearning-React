import React from 'react'
import { Stack, Button,Fab, TextField, Box,styled, alpha } from '@mui/material';
import io from 'socket.io-client'
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import MessageC from 'src/components/MessageC';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';



const ChatBoxT = styled(ReactScrollToBottom)(({theme}) => ({
    height: "72vh",
    boxSizing: "border-box",
    backgroundColor: "white",
    overflowY: "auto",
    '*::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.5em'
      },
      '*::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#38A585',
      }

}));

const MainBox = styled(Box)(({theme})=>({
    width: "100%", 
    height: "100%", 
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)"

}))

// const MsgBoxright = styled(Box)(({theme}) => ({
//     float: "right",
//     backgroundColor: "#E7F4F0",
//     color: "black"
// }))

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
    const [messageT, setMessageT] = useState([]);
    const { user } = useSelector(state => state.user);
    const socket = io("https://inspirylearning-web.herokuapp.com")
    const socketRef = useRef(socket); 

    const [stat, setStat] = useState({text: ''});
    useEffect(
		() => {
			socketRef.current.on("connect", () => {
            socketRef.current.emit('join',{
                    user_id: user.user_id,
                    assignment_id: "14"
                })
                
              });
		},[]);
        useEffect(()=>{
            socketRef.current.on("message", (message)=>{
                console.log(messageT, "arry before");
                setMessageT([...messageT, message]);
                console.log(message, "DATA");
                console.log(messageT, "arry arry after");
                
            })
        })
        const onTextChange = e =>{
            e.preventDefault();
            setStat({[e.target.name]: e.target.value })
            console.log(stat.text);
        }
            const onMessageSubmit = (e) => {
            e.preventDefault();
            const {text} = stat
            socketRef.current.emit("sendMessage", {
                "message": text
            })
            // setMessageT([...messageT, text])
            setStat({ text: "",})
            
        }
        console.log(messageT, "HELLO WORLD!!");

    return (
        <>
        <MainBox>
            <ChatBoxT>
                {messageT.map((item,i) => <MessageC key={i} message={item.text} />)}
            </ChatBoxT>
        </MainBox>
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
               
                    <TextField label="Type Your Message"  variant="filled" name="text" onChange={e => onTextChange(e)}
                    value={stat.text}
                    sx={{
                        opacity: 0.8
                        }}> </TextField>
                        {stat.text ? <Button type='submit'><SendIcon/></Button> : null}
                       
            </Stack>
            </form>
        </Fab>
        </>
    );


}

export default Chat;

//<img alt="send" src="/static/send.svg" width= {25} height={25} />
//<img alt="attachment" src="/static/attachment.svg" width={30} height={30} />