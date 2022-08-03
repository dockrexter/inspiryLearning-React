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



const ChatBoxT = styled(ReactScrollToBottom)(({theme}) => ({
    height: "70vh",
    boxSizing: "border-box",
    backgroundColor: "white",
    overflowY: "auto",
    scrollbarWidth: "thin",
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
    boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
    margin: "0 10px"

}))

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
const FilePreview = styled(Box)(({theme})=>({
    marginTop: "30px"
}))

const FilePreviewItem = styled(Box)(({theme})=>({
    position: "relative",
    display: "flex",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "20px"
}))
const FilePreviewInfo = styled(Box)(({theme})=>({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [offer, setOffer] = useState(0);
    const [offerSummary, setOfferSummary] = useState("");
    const [attachOpen, setAttachOpen]=useState(false);
    const [fileList, setFileList] = useState([]);
    useEffect(()=>{
        console.log("Offer Amount:", offer);
        console.log("Offer Summary", offerSummary);
    },[offerSummary])

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
  };


//........................Offer Handle..................//
const offerHandle= () =>{

}
//........................INPUT INPUT AND HANDLE SUBMITS.......................//

    // const changeFileHandler = (e) => {
    // console.log("EVENT CALL INPUT",e.target.files[0]);
    // setSelectedFile(e.target.files[0]);
    // console.log("File upload Check", selectedFile);
    // setIsFilePicked(true);
    // }

    const handleUploadClick = event => {
        hiddenInputField.current.click();
      };
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList =  newFile;
            setFileList(updatedList);
            setIsFilePicked(true);
            props.onFileChange(updatedList);
        }
    }
    const fileRemove = () => {
        const updatedList = [];
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

//....................AXIOS REQUEST FOR FILE UPLOAD............................//


const handleFile = async () => {
    const formData = new FormData();
    formData.append( 
        "file", 
        selectedFile, 
        selectedFile.name 
      );
      console.log("FILE CHECK in FORMDATA", selectedFile);
    // try {
        const res = await axios.post(`${BackEndUrl}/api/upload`, formData
        );
        if (res.data.status === "ok") {
          console.log("File Upload Success")
          setIsFilePicked(false);
        }
        console.log(res)
    }
    //   }
    //   catch (error) {
    //     console.error("Failed Upload", error);
    //   }}


//..................SOCKET.IO........................//


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
             })
             socketRef.current.on("message",(chat)=>{
                setMessageT([...messageT],chat);
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
                time_stamp: "2022-06-27 12:07:50.234Z " ,
                attachment: null,
                ammount: offer,
                type: 0,
                status:0,
                assignment_id: 14  

            })
            const user_id = user.user_id;
            console.log("User iddd",user.user_id)
            setMessageT([...messageT, {message, user_id}]);
            setStat({ text: "",})
            
        }

    return (
        <>
        {/*............CHAT BOX MESSAGES AND OTHER ATTACHMENTS..............*/}
        <MainBox>
            <ChatBoxT>
            <Typography>Select Assignment to Chat</Typography>
                {messageT.map((item,i) => <MessageC key={i} data={item} />)}
            </ChatBoxT>
        </MainBox>

        {/*...........FLOAT BUTTON FOR TEXT,ATTACHMENTS and MONEY...............*/}

        <Fab variant="extended" size="large" color="primary" aria-label="add" sx={{
            marginLeft: "15%",
            padding: 4,
            marginTop: "1px"
        }}>
            <form onSubmit={onMessageSubmit}>
                <Stack direction="row" spacing={2} sx={{
                    display: "flex", justifyContent: "center", alignItems: "center"
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
                                        <Input type="number" onChange={(e) => setOffer(e.target.value)} sx={{width:"50px", height: "50px"}}/>
                                    </Box>
                                    <Typography>Summary</Typography>
                                    <TextField multiline={true} rows={3} onChange={(e) => setOfferSummary(e.target.value)} sx={{ width: "300px"}}></TextField>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button>Send</Button>
                            </DialogActions>
                            </Dialog>
                            </> 
                            :
                             <AttachMoneyIcon disabled/>}

                             {/*....................ATTACHMENTS OVER HERE....................*/}

                        <IconButton onClick={handleAttachOpen} sx={{color: blueGrey[50] }}><AttachFileIcon/></IconButton>
                        <Dialog
                            open={attachOpen}
                            onClose={handleAttachClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title">
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Upload Your File
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Box sx={{display: "flex", alignItems: "center", margin:"10px 0"  }}>
                                        <FilePreview>
                                            <FilePreviewItem>
                                               {/* <img src={ImageConfig[fileList.type.split('/')[1]] || ImageConfig['default']} alt="" />*/}
                                            <FilePreviewInfo>
                                                <Typography variant='span'>{fileList.name}</Typography>
                                                <Typography variant='span'>{fileList.size}</Typography>
                                            </FilePreviewInfo>
                                            <span className="drop-file-preview__item__del" onClick={() => fileRemove}>x</span>
                                            </FilePreviewItem>
                                        </FilePreview>
                                    <input type="file" ref={hiddenInputField} onChange={onFileDrop} style={{display: "none"}}/>
                                    </Box>
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
               
                    <TextField label="Type Your Message"  variant="filled" name="message" onChange={e => onTextChange(e)}
                    value={stat.text}
                    sx={{
                        input: { color: "white" },
                        opacity: 0.8
                        }}> </TextField>
                        {stat.message ? <IconButton type='submit'><SendIcon sx={{color: blueGrey[50] }}/></IconButton> : <IconButton> <SendIcon disabled/></IconButton>} 
                </Stack>
            </form>
        </Fab>
        </>
    );


}

Chat.propTypes = {
    onFileChange: PropTypes.func
}

export default Chat;

//<img alt="send" src="/static/send.svg" width= {25} height={25} />
//<img alt="attachment" src="/static/attachment.svg" width={30} height={30} />