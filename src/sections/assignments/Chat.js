import React from 'react'
import { Stack,Fab, TextField, Box,styled,IconButton } from '@mui/material';
import io from 'socket.io-client'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import MessageC from 'src/components/MessageC';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { blueGrey } from '@mui/material/colors'



const ChatBoxT = styled(ReactScrollToBottom)(({theme}) => ({
    height: "70vh",
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
    height: "70vh", 
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)"

}))
const Chat = () => {
    const [messageT, setMessageT] = useState([]);
    const { user } = useSelector(state => state.user);
    const [chatMsg, setchatMsg] = useState();
    const socket = io("https://inspirylearning-web.herokuapp.com")
    const socketRef = useRef(socket);
    const hiddenInputField = useRef(null); 
    const chattime = moment(new Date()).format('YYYY MM DD HH:MM: SS.US+TZ');
    const d = new Date();
    let day = d.getUTCDate();
    console.log(day, "THIS IS UTC FORMATE");




//........................INPUT REF.......................//


    const handleUploadClick = event => {
        hiddenInputField.current.click();
      };
    const handleInputChange = event => {
        const fileUploaded = event.target.files[0];
      };


    const [stat, setStat] = useState({message: '', user_id:'', });
    useEffect(
		() => {
			socketRef.current.on("connect", () => {
            socketRef.current.emit('join',{
                    user_id: user.user_id,
                    assignment_id: "14"
                })
                
              });
             socketRef.current.on("getChat",(chat)=>{
                setMessageT(chat.data);
                //  console.log(chat,"HELLOOOO ARRAY");
                //  for (var i = 0; i < chat.data.length; i++) {
                //     var data1 = chat.data[i];
                //     setMessageT([...messageT, data1])
                //     console.log(data1.message, "THIS MESSAGE");
                // }
             })
		},[messageT]);
        // useEffect(()=>{
        //     // socketRef.current.on("getChat",(chat)=>{
        //     //     setMessageT([...messageT, chat]);
        //     //     console.log(chat, "DATA");
        //     // })
        // })
        const onTextChange = e =>{
            e.preventDefault();
            setStat({[e.target.name]: e.target.value })
            console.log(stat.message,"helllllllo");
        }
            const onMessageSubmit = (e) => {
            e.preventDefault();
            const {message} = stat
            console.log(messageT, "HELLO !@#");
            socketRef.current.emit("sendMessage", {
                message: message,
                user_type: 0,
                time_stamp: chattime ,
                attachment: null,
                ammount: 10,
                type: 0,
                status:0,
                assignment_id: 14  

            })
            setMessageT([...messageT, {message}]);
            setStat({ text: "",})
            
        }

    return (
        <>
        <MainBox>
            <ChatBoxT>
                {messageT.map((item,i) => <MessageC key={i} data={item} />)}
            </ChatBoxT>
        </MainBox>
        <Fab variant="extended" size="large" color="primary" aria-label="add" sx={{
            marginLeft: "20%",
            padding: 4,
            marginTop: "5%"
        }}>
            <form onSubmit={onMessageSubmit}>
                <Stack direction="row" spacing={2} sx={{
                    display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <>
                        <IconButton onClick={handleUploadClick} sx={{color: blueGrey[50] }}><AttachFileIcon/></IconButton>
      
                        <input type="file" ref={hiddenInputField} onChange={handleInputChange} style={{display: "none"}}/>
                        </>
               
                    <TextField label="Type Your Message"  variant="filled" name="message" onChange={e => onTextChange(e)}
                    value={stat.text}
                    sx={{
                        color: "white",
                        opacity: 0.8
                        }}> </TextField>
                        {stat.message ? <IconButton type='submit'><SendIcon sx={{color: blueGrey[50] }}/></IconButton> : <IconButton> <SendIcon disabled/></IconButton>}   
                </Stack>
            </form>
        </Fab>
        </>
    );


}

export default Chat;

//<img alt="send" src="/static/send.svg" width= {25} height={25} />
//<img alt="attachment" src="/static/attachment.svg" width={30} height={30} />