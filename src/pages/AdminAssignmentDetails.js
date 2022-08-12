import { Grid, Container, Typography, Stack,DialogActions, Button, Card, Checkbox, Box, IconButton, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, CircularProgress, OutlinedInput} from '@mui/material';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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


export default function AdminAssignmentDetails() {
    const { user } = useSelector(state => state.user);
    const { assignment } = useSelector(state => state.assignment);
    const [status, setStatus] = useState("");
    const [assignData, setAssignData] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate(); 
    const [open, setOpen] = useState(false);
    const [finish, setFinish] = useState(false);

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
                                </> : null}
                            </Box>
                        </Grid>
                        {loading ? <Box sx={{display: "flex", justifyContent: "space-around", height: "400px", width: "400px", marginTop: 3 }}>
                                  <CircularProgress size={80} />
                                </Box> :
                                <>
                            <Grid item xs={12}>
                                {assignData.filter(opt => opt.id === assignment.id).map((d ,i) =>
                                    <Card key={i} sx={{
                                        width: "100%",
                                        background: "#E7F4F0",
                                        boxShadow: "0px 7.69539px 7.69539px #195B48",
                                        borderRadius: "15.3908px",
                                        marginTop: 1

                                    }}>
                                        <Grid container sx={{ padding: 2 }} spacing={1}>

                                            <Grid item xs={4}>
                                                <Stack direction="column">
                                                    <Typography variant="body2" sx={{
                                                        color: "#EAB531",
                                                        fontStyle: "normal",
                                                        fontWeight: 700,
                                                        fontSize: "17.2385px",
                                                        lineHeight: "27px"
                                                    }}>
                                                        Due Today     </Typography>
                                                    <Typography variant="body2" >
                                                        {moment(d.deadline).format("MMMM Do YYYY")}
                                                    </Typography>

                                                </Stack>
                                            </Grid>
                                            <Grid item xs={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Typography variant="subtitle1" sx={{
                                                    color: "#4F433C",
                                                    fontStyle: "normal",
                                                    fontWeight: 700,
                                                    fontSize: "20.9339px",
                                                    lineHeight: "27px"
                                                }}>
                                                    {d.subject} Science
                                                </Typography>

                                            </Grid>

                                            <Grid item xs={4}>
                                                <Stack direction="column">
                                                    <Typography variant="body2" sx={{
                                                        color: "#0FA958",
                                                        fontStyle: "normal",
                                                        fontWeight: 700,
                                                        fontSize: "17.2385px",
                                                        lineHeight: "27px"
                                                    }}>
                                                        Starting Date
                                                    </Typography>
                                                    <Typography variant="body2" >
                                                        {moment(d.created_date).format("MMMM Do YYYY")}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                                <Typography variant="caption" >
                                                    {d.status}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={4} sx={{
                                                display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                                            }}>
                                                {d.status === "Work Completed" ? <CheckCircleIcon sx={{ color: "#00e676"}}/> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
                                            </Grid>
                                        </Grid>
                                    </Card>

                                 )}
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
