import React from 'react'
import { Stack,Fab, Paper, TextField, Box, styled,IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, Input } from '@mui/material';
import io from 'socket.io-client'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import MessageC from 'src/components/MessageC';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import { BackEndUrl } from 'src/url';
import Draggable from 'react-draggable'
import { ImageConfig } from '../../../src/ImageConfig';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';



const ChatBoxT = styled(ReactScrollToBottom)(({theme}) => ({
    height: "70vh",
    boxSizing: "border-box",
    backgroundColor: "#F5F1F5",
    overflowY: "auto",
    '*::-webkit-scrollbar': {
        display: "none",
      }
}));

const MainBox = styled(Box)(({theme})=>({
    width: "100%", 
    height: "70vh", 
    margin: "0 auto"

}))


const FilePreview = styled(Box)(({theme})=>({
    marginTop: "30px"
}))

const FilePreviewItem = styled(Box)(({theme})=>({
    position: "relative",
    display: "flex",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "20px",
    flexDirection: "column",
}))
const FilePreviewInfo = styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}))
 //.........................................................//

 function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

const Chat = (props) => {
//.......................HOOKS DECALRATION....................//

    const [messageT, setMessageT] = useState([]);
    const { user } = useSelector(state => state.user);
    const socket = io("http://inspirylearning-web.herokuapp.com")
    const socketRef = useRef(socket);
    const hiddenInputField = useRef(null); 
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [offer, setOffer] = useState(0);
    const [offerSummary, setOfferSummary] = useState("");
    const [attachOpen, setAttachOpen]=useState(false);
    const [fileList, setFileList] = useState([]);
   

    useEffect(()=>{
        // console.log("Offer Amount:", offer);
        // console.log("Offer Summary", offerSummary);
        console.log("File List Check", fileList);
    },[fileList])

//................Payment Popup handles....................//
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAttachOpen = () => {
    setAttachOpen(true);
  };
  const handleAttachClose = () => {
    setAttachOpen(false);
    setFileList([]);
  };


//........................Offer Handle..................//
const handleOffer= async() =>{
    const res = await axios.post(`${BackEndUrl}/payment/pay`, 
        offer,
    {
      headers: {
        token: user.token
      }
    },
        );
        if (res) {
            console.log("Payment Success");
            socketRef.current.emit("sendMessage", {
              message: offerSummary,
              user_type: 0,
              time_stamp: "2022-06-27 12:07:50.234Z",
              attachment: null,
              ammount: offer,
              type: 1,
              status:0,
              assignment_id: 24,  
          
              })
              const user_id = user.user_id;
          setMessageT([...messageT, {message: `Amount: $${offer} || ${offerSummary}`, user_id ,type: 2, time_stamp: new Date()}]);
            setOffer(0);
          }   
}
//........................INPUT INPUT AND HANDLE SUBMITS.......................//


    const handleUploadClick = event => {
        hiddenInputField.current.click();
      };
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            console.log("Testing on new file",newFile);
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            setIsFilePicked(true);
            // props.onFileChange(updatedList);
        }
    }
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        // props.onFileChange(updatedList);
        if(updatedList.length === 0){
            setIsFilePicked(false);
        }
    }

//....................AXIOS REQUEST FOR FILE UPLOAD............................//


const handleFile = async () => {
    console.log("File List Submitted", fileList);
    if(fileList.length > 0){
    for(var i=0; i<fileList.length; i++){
    const formData = new FormData();
    formData.append( 
        "file", 
        fileList[i], 
        fileList[i].name 
      );
      console.log("FILE CHECK in FORMDATA", fileList);
        const res = await axios.post(`${BackEndUrl}/api/upload`, formData
        );
        if (res.data.status === "ok") {
          console.log("File Upload Success");
          socketRef.current.emit("sendMessage", {
            message: "Attachment",
            user_type: 0,
            time_stamp: "2022-06-27 12:07:50.234Z",
            attachment: `${BackEndUrl}/${res.data.url}`,
            ammount: offer,
            type: 2,
            status:0,
            assignment_id: 24,  
        
            })
            const user_id = user.user_id;
        setMessageT([...messageT, {message: "Attachment", user_id ,type: 2, time_stamp: new Date()}]);
          setIsFilePicked(false);
        }
    }}
    setAttachOpen(false);
    setFileList([]);

}
   
//..................SOCKET.IO........................//


    const [stat, setStat] = useState({message: '', user_id:'', });
    useEffect(
		() => {
			socketRef.current.on("connect", () => {
            socketRef.current.emit('join',{
                    user_id: user.user_id,
                    assignment_id: 24
                })
                
              });
             socketRef.current.on("getChat",(chat)=>{
                setMessageT(chat.data);
             })
             socketRef.current.on("message",(data)=>{
                setMessageT([...messageT,data]);
             })

		},[messageT]);

//.....................TEXT GETTING FROM INPUT FILED...............// 



        const onTextChange = e =>{
            e.preventDefault();
            setStat({[e.target.name]: e.target.value })
            //console.log(stat.message,"helllllllo");
        }
            const onMessageSubmit = (e) => {
            e.preventDefault();
            const {message} = stat
           // console.log(messageT, "HELLO !@#");
            socketRef.current.emit("sendMessage", {
                message: message,
                user_type: 0,
                time_stamp: "2022-06-27 12:07:50.234Z" ,
                attachment: null,
                ammount: offer,
                type: 0,
                status:0,
                assignment_id: 47  

            })
            const user_id = user.user_id;
            console.log("User iddd",user.user_id)
            setMessageT([...messageT, {message, user_id}]);
            setStat({ message: ""})
            
        }
    return (
        <Box sx={{
            backgroundColor: "#F5F1F5",
            width: "100%",
            height: "100%",
            margin: "0 auto" }}>
        {/*............CHAT BOX MESSAGES AND OTHER ATTACHMENTS..............*/}

        <MainBox>
            <ChatBoxT>
                {messageT.map((item,i) => <MessageC key={i} data={item} />)}
            </ChatBoxT>
        </MainBox>

        {/*...........BOX FOR TEXT,ATTACHMENTS and MONEY...............*/}


         <Box sx={{ 
            margin: "1px auto",
            backgroundColor: "#38A585",
            width: "80%",
            borderRadius: "20px",
            padding: 1,
        }}>
            <form onSubmit={onMessageSubmit}>
                <Stack direction="row" spacing={2} sx={{
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                        <>
                        
                        {user.role === "admin" ? 
                        <> 
                        <IconButton onClick={handleClickOpen} sx={{color: blueGrey[50]}}><AttachMoneyIcon/></IconButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title">
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Create an Offer
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Box sx={{display: "flex", alignItems: "center", margin:"10px 0"  }}>
                                        <Typography variant='h4'>$</Typography>
                                        <Input type="number" min="0" onChange={(e) => setOffer(e.target.value)} sx={{width:"50px", height: "50px"}}/>
                                    </Box>
                                    <Typography>Summary</Typography>
                                    <TextField multiline={true} rows={3} onChange={(e) => setOfferSummary(e.target.value)} sx={{ width: "300px"}}></TextField>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleOffer}>Send</Button>
                            </DialogActions>
                            </Dialog>
                            </> 
                            :
                             null}

                             {/*....................ATTACHMENTS OVER HERE....................*/}

                        <IconButton onClick={handleAttachOpen} sx={{color: blueGrey[50] }}><AttachFileIcon/></IconButton>
                        <Dialog
                            open={attachOpen}
                            onClose={handleAttachClose}
                            PaperComponent={PaperComponent}>
                            <DialogTitle style={{ cursor: 'move' }}>
                                Upload Your File
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                {
                                    fileList.length > 0 ? (
                                    <Box sx={{display: "flex", alignItems: "center", margin:"10px 0", flexDirection:"column"  }}>
                                        <FilePreview>
                                        {
                                        fileList.map((item, index) => (
                                            <FilePreviewItem key={index}>
                                                 <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                                <FilePreviewInfo>
                                                    
                                                    <Typography variant='span'>{fileList.name}</Typography>
                                                    <Typography variant='span'>{fileList.size}</Typography>
                                                    <IconButton onClick={() => fileRemove(item)}><CancelIcon/></IconButton>
                                                </FilePreviewInfo>
                                            </FilePreviewItem>
                                            ))
                                        }
                                        </FilePreview>
                                    </Box>
                                    ) : null}
                                    <input type="file" ref={hiddenInputField} onChange={onFileDrop} style={{display: "none"}}/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={handleAttachClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleUploadClick}>Upload</Button>
                            {isFilePicked? <Button onClick={handleFile}>Submit</Button> : <Button disabled>Submit</Button>}
                            </DialogActions>
                            </Dialog>
                        </>
               
                    <TextField label="Type Your Message" name="message" onChange={e => onTextChange(e)}
                    value={stat.text}
                    sx={{
                        input: { color: "white" },
                        floatingLabelFocusStyle: { color: "white" },
                        width: "70%",
                        opacity: 0.8
                        }}> </TextField>
                        {stat.message ? <IconButton type='submit'><SendIcon sx={{color: blueGrey[50], fontSize:30 }}/></IconButton> : <IconButton> <SendIcon disabled sx={{ fontSize:30 }}/></IconButton>} 
                </Stack>
            </form>
        </Box>
        </Box>
    );


}

Chat.propTypes = {
    onFileChange: PropTypes.func
}

export default Chat;

//<img alt="send" src="/static/send.svg" width= {25} height={25} />
//<img alt="attachment" src="/static/attachment.svg" width={30} height={30} />