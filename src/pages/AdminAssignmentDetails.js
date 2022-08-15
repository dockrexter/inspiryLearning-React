import { Grid, Container, Paper, Typography,DialogContentText, TextField, Stack,DialogActions, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, CircularProgress, OutlinedInput} from '@mui/material';
import moment from 'moment';
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


export default function AdminAssignmentDetails() {
    const { user } = useSelector(state => state.user);
    const { assignment } = useSelector(state => state.assignment);
    const [status, setStatus] = useState("");
    const [assignData, setAssignData] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate(); 
    const [open, setOpen] = useState(false);
    const [finish, setFinish] = useState(false);
    const [openAssigne, setOpenAssigne] = useState(false);
    const [assigneSum, setAssigneSum] = useState("");

    //................ADD Assignee.........//
    const handleAssignee= async() =>{
            try {
            const res = await axios.post(`${BackEndUrl}/assignment/updateAssignee`, {
                id: assignment.id,
                assignee: assigneSum,
              },
              {
                headers: {
                  token: user.token
                }
              },
              );
              if (res.data.status === "ok") {
                console.log("Assignee Added", res.data);
                setOpenAssigne(false);

            }
        } catch (error) {
            console.error("Error in Assignee: ", error);
                
        }           
    }
    const handleClickOpenAssigne = () => {
        setOpenAssigne(true);
    }
    const handleAssigneClose = () => {
        setOpenAssigne(false);
      };
    //.............API CALL...............//
    const getAssignment = async () => {
    try {
        
    const res = await axios.post(`${BackEndUrl}/assignment/getCurrentMonthAssignments`, {
        currentMonth: moment(assignment.deadline).format('MM'),
        currentYear: moment(assignment.deadline).format('YYYY'),
      },
      {
        headers: {
          token: user.token
        }
      },
      );
      if (res.data.status === "ok") {
        setAssignData(res.data.assignments);
        setLoading(false);
    }
} catch (error) {
    console.error("Error in Details: ", error);
        
}
    }

    //...................................//

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
            try {
                const res = await axios.post(`${BackEndUrl}/assignment/changeStatus`, {
                    id: assignment.id, 
                    status: status
                },
                {
                  headers: {
                    token: user.token
                  }
                },
                );
                if (res.data.status === "ok") {
                    alert("Status Updated SucessFully")
                    setFinish(true);
                }
              }
              catch (error) {
                console.error("Error", error);
                alert("Something went wrong Please Try Again")
              }
        
        setOpen(false);
    }
  };

    const handleBack = () => {
    navigate("/")
    } 
    useEffect(() => {
        getAssignment();
    },[finish]);
    return (
        <DashboardPage title="Dashboard" style={{
            marginTop: "2px", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%"}} >
            <Grid item xs={6} sx={{
                    width: "860px",
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
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
                                                        <option value={"New Request"}>New Request</option>
                                                        <option value={"Under Review"}>Under Review</option>
                                                        <option value={"Pending Payment"}>Pending Payment</option>
                                                        <option value={"Work in Progress"}>Work in Progress</option>
                                                        <option value={"Work Completed"}>Work Completed</option>
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
                                            <TextField onChange={(e) => setAssigneSum(e.target.value)} sx={{ width: "300px"}}></TextField>
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
                        {loading ? <Box sx={{display: "flex", justifyContent: "space-around", height: "400px", width: "400px", marginTop: 3 }}>
                                  <CircularProgress size={80} />
                                </Box> :
                                <>
                            <Grid item xs={12}>
                                {assignData.filter(opt => opt.id === assignment.id).map((d ,i) =>
                                    <AssignmentCard key={i} d={d} /> )}
                            </Grid>
                        

                            <Grid item xs={12} sx={{ marginTop: 5 }}>
                            {assignData.filter(opt => opt.id === assignment.id).map((d,i) =>
                                <Stack  key={i} direction="column" spacing={2}>
                                    <Typography variant="h5" sx={{ color: "#4F433C", opacity: 0.7, fontWeight: 700 }}>
                                        Discription      </Typography>
                                    <Typography variant="body2" sx={{ color: "#202323", opacity: 0.6 }}>
                                        {d.summary} 
                                    </Typography>

                                    <Typography variant="h6" sx={{ color: "#6ABBA3", fontWeight: 700 }}>
                                        Attachments       </Typography>
                                </Stack>
                                )}    
                            </Grid>
                            </>
                    }
                        </Grid>
                    </Container>
                </Grid >
                <Grid item xs={6} sx={{ height: "100%", width: "100%" }}>
                    <Chat/>
                </Grid>
            </Grid >
        </DashboardPage>
    );
}
