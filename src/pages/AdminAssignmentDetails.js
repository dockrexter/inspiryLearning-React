import { Grid,
  Container,
  Paper,
  styled , 
  Typography, 
  TextField, 
  Stack,
  DialogActions, 
  Button, 
  Box, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  FormControl, 
  InputLabel, 
  Select, 
  CircularProgress, 
  OutlinedInput} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'
import Chat from 'src/sections/assignments/Chat';
import axios from 'axios';
import DashboardPage from 'src/components/dashboardPage';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BackEndUrl } from '../url';
import { useEffect } from 'react';
import AssignmentCard from '../components/AssignmentCard';
import Draggable from 'react-draggable'
import { AttachmentText, AttachmentSize} from 'src/components/MessageC';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ImageConfig } from '../ImageConfig';
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify';

const AttachmentBox = styled(Box)(({theme})=> ({
  backgroundColor: "#E7F4F0",
  padding: "0.1vmax",
  margin: "0.2vmax",
  borderRadius: "0.5vmax",
  display: "inline-block",
  width: "80%",
  clear: "both",
  wordWrap:"break-word",
  boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
}))

const GridStyled = styled(Grid)(({theme})=> ({
  width: "1000px",
  [theme.breakpoints.down('md')]: {
    width: "100%",
  }
}))
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

const ChatStyle = styled(Grid)(({ theme }) =>({
  height: "100%", 
  width: "100%",
}));


export default function AdminAssignmentDetails() {
    const { user } = useSelector(state => state.user);
    const { assignment } = useSelector(state => state.assignment);
    const [status, setStatus] = useState(2);
    const [assignData, setAssignData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAttach, setLoadingAttach] = useState(true);
    let navigate = useNavigate(); 
    const [open, setOpen] = useState(false);
    const [finish, setFinish] = useState(false);
    const [openAssigne, setOpenAssigne] = useState(false);
    const [assigneSum, setAssigneSum] = useState("");
    const [assignAttach, setAssignAttach] = useState([]);



    const handleDownloadfile = async(url, filename) => {
      const toastid = toast.loading("Please wait...")
      try {
      const res = await axios.get(`${BackEndUrl}${url}`, {
        responseType: 'blob',
      });
      if(res) {
        fileDownload(res.data, filename)
        toast.update(toastid, {isLoading: false, autoClose:10});
      }
    } catch (error) {
      toast.update(toastid, {render: "Can't get file right now", type: "error",isLoading: false})
      console.error("ATTACHMENT DOWNLOAD ERROR: ", error);    
    }

       
   }


    const handleAttachments= async() =>{
      try {
      const res = await axios.post(`${BackEndUrl}/api/assignments/getAttachments`, {
          assignment_id: assignment.id,
        },
        {
          headers: {
            token: user.token
          }
        },
        );
        if (res) {
         // console.log("Attach=>",res)
          setAssignAttach(res.data.data);
          setLoadingAttach(false);
      }
  } catch (error) {
      console.error("Error in Attachments: ", error);
          
  }          
}

    //................ADD Assignee.........//
    const handleAssignee= async() =>{
      setFinish(false);
            try {
            const res = await axios.post(`${BackEndUrl}/api/assignments/updateAssignee`, {
                assignment_id: assignment.id,
                assignee: assigneSum,
              },
              {
                headers: {
                  token: user.token
                }
              },
              );
              if (res.data.status === "ok") {
                toast.success(`Asignee Added SuccessFully!!`);
                setFinish(true);

            }
        } catch (error) {
          toast.error(`Can't Add Asignee!! Please Try Again`);
            console.error("Error in Assignee: ", error);
                
        }   
        setOpenAssigne(false);        
    }
    const handleClickOpenAssigne = () => {
        setOpenAssigne(true);
    }
    
    const handleAssigneClose = () => {

        setOpenAssigne(false);

      };

  //..................Api Call...................//

    const getAssignmentbyID = async () => {
      try {
          const res = await axios.post(`${BackEndUrl}/api/assignments/getAssignmentById`, {
          assignment_id: assignment?.id
        },
        {
          headers: {
            token: user.token
          }
        },
        );
        if(res.data.status === "ok") {
          setAssignData(res.data.data);
          setLoading(false);
        }
      } 
      catch (error) {
      console.error("NEW API RESPONSE=>",error);        
  }
      }



//..............................................//


  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleStatusSubmit = async (event, reason) => {
    if (reason !== 'backdropClick') {
        setFinish(false);
        setOpen(false);
            try {
                const res = await axios.post(`${BackEndUrl}/api/assignments/updateStatus`, {
                    assignment_id: assignment.id, 
                    status: status
                },
                {
                  headers: {
                    token: user.token
                  }
                },
                );
                if (res.data.status === "ok") {
                  toast.success(`Status Updated Sccessfully`);
                    setFinish(true);
                }
              }
              catch (error) {
                console.error("Error", error);
                toast.error("Status Update Failed! Try Again")
              }
        
    }
  };
  //.....................................................................//

    const handleBack = () => {

    navigate("/")

    } 




    useEffect(() => {
        handleAttachments();
        getAssignmentbyID();
    },[finish]);



    return (
      <>
      {loading ? <Box sx={{display: "flex"}}>
                                  <CircularProgress size={100} />
                                </Box> :
        <DashboardPage title="Dashboard" style={{
            marginTop: "2px", borderTop: "1.02801px solid #C0C0C2"}}>
            <Grid container sx={{ width: "100%",height: "80vh"}} >
            <Grid item xs={12} md={6} sx={{
                    width: "100%",
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
                    <Container maxWidth="xl">
                        <Grid container sx={{width: "100%"}}>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                            <IconButton onClick={handleBack}><ChevronLeftIcon/></IconButton>
                            {user.role === "admin" ? <>
                            <Button onClick={handleClickOpenAssigne}>Add Assignee</Button>
                            <Button onClick={handleClickOpen}>Change Status<ArrowDropDownIcon/></Button>
                                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                    <DialogTitle>Change Status</DialogTitle>
                                        <DialogContent>
                                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel htmlFor="dialog">Status</InputLabel>
                                                    <Select
                                                        native
                                                        value={status}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput label="Status" id="dialog" />}>
                                                        <option aria-label="None" value="" />
                                                        <option value={2}>New Request</option>
                                                        <option value={3}>Under Review</option>
                                                        <option value={4}>Pending Payment</option>
                                                        <option value={1}>Work in Progress</option>
                                                        <option value={0}>Work Completed</option>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleStatusSubmit}>Submit</Button>
                                        </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={openAssigne}
                                    onClose={handleAssigneClose}
                                    PaperComponent={PaperComponent}
                                    aria-labelledby="draggable-dialog-title"
                                    >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                        Add an Assignee
                                    </DialogTitle>
                                    <DialogContent>
                                            <TextField onChange={(e) => setAssigneSum(e.target.value)} sx={{ width: "100%"}}></TextField>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleAssigneClose}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleAssignee}>Add</Button>
                                    </DialogActions>
                                </Dialog>
                                </> : null}
                            </Box>
                        </Grid>
                                <>
                            <GridStyled item xs={12} sx={{width: "1000px"}}>
                                   <AssignmentCard d={assignData} />
                            </GridStyled>
                        

                            <Grid item xs={12} sx={{ marginTop: 5 }}>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h5" sx={{ color: "#4F433C", opacity: 0.7, fontWeight: 700 }}>
                                    Description      
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#202323", opacity: 0.6 }}>
                                        {assignData?.summary} 
                                    </Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ color: "#6ABBA3", fontWeight: 600,marginBottom: 5 }}>
                                        Attachments       </Typography>
                                        {loadingAttach ? 
                                        <Box sx={{display: "flex", justifyContent: "space-around", height: "40%", width: "60%", margin: "auto" }}>
                                          <CircularProgress size={80} />
                                          </Box> : 
                                          assignAttach.map((d,i) =>
                                              <AttachmentBox key={i}>
                                                  <AttachmentText>Attachment</AttachmentText>
                                                  <Box sx={{display: "flex",borderRadius: "8.03922px", alignItems:"center",  wordWrap:"break-word", margin: "5% 5%", backgroundColor:"#DCE9E5", justifyContent: "space-between" }}>
                                                        <Box sx={{width: "10%", height: "10%"}}>
                                                            <img src={ImageConfig['default']} alt="Attachment"/>
                                                          </Box>
                                                          <AttachmentSize variant='body2'>{d.fileName}</AttachmentSize>
                                                          <IconButton
                                                              onClick={()=>{handleDownloadfile(d.url, d.fileName)}}
                                                          ><DownloadForOfflineIcon/></IconButton>
                                                        </Box>
                                                            <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                                                              <AttachmentSize>{Math.round(d.fileSize/1024)}KB</AttachmentSize>
                                                            </Box>
                                            </AttachmentBox>
                                        )
                                      }
                            </Grid>
                            </>
                    
                        </Grid>
                    </Container>
                </Grid >
                <ChatStyle 
                alignItems="center"
                justifyContent="center"
                sx={{height: "80vh"}}
                item xs={12} md={6}>
                    <Chat/>
                </ChatStyle>
            </Grid >
        </DashboardPage>}
      </>
    );
}
