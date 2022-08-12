import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Grid,Checkbox, Container,Typography, Button, Box, CircularProgress, Card, CardActionArea, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import DashboardPage from '../components/dashboardPage';
// sections
import { BackEndUrl } from '../url';
import moment from 'moment';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { update } from 'src/redux/assignments';
import { useNavigate } from 'react-router-dom';



// ---------------------------------------------------------------------- //

export default function DashboardApp() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  



const handleCard =(id, deadline) =>{
  console.log("assignment",id)
  dispatch(update({id, deadline}));
  navigate('/dashboard/assigmentdetails');
}

 // Calling Assignment Api For User
  const getAssignments = async () => {
    try {

      const res = await axios.get(`${BackEndUrl}/assignment/getAssignments?user_id=${user.user_id}`, {
        headers: {
          token: user.token
        }
      });
      //console.log("assignments", res.data);
      if (res.data.status === "ok") {
        setAssignments(res.data.assignments);
        setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAssignments();
  }, []);
  return (
   <DashboardPage title="Dashboard" style={{
      marginTop: "2px" }}>
      <Grid container sx={{ width: "100%"}}>
      <Grid item xs={12} sx={{
                    paddingTop: 2,
                    overflowY: "scroll",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
          <Container maxWidth="xl">
            <Grid container sx={{height: "80vh"}}>
              <Grid item xs={12} sx={{ display:"flex", justifyContent:"space-between" }}>
                {/*Submit New Assignment Here*/}
                <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6, padding: 1 }}>
                  Submmited Assignments      </Typography>
                <Button size="medium" color="secondary" variant='contained' component={RouterLink} to="/dashboard/assignmentform" sx={{height:"50px"}} >
                  New Assignment
                </Button>
                
              </Grid>
              {assignments && assignments.length > 0 ?
                <Box sx={{
                  width: "1000px",
                  padding:2,
                  alignItems: "center",
                }}>
                  <Grid item xs={8} sx={{margin: "auto"}}>
                      {assignments.map((d ,i)=>
                          <Card sx={{
                              background: "#E7F4F0",
                              boxShadow: "0px 7.69539px 7.69539px #195B48",
                              borderRadius: "15.3908px",
                              marginTop: 3,
                              transition: '0.3s',
                              '&:hover': {
                                  transform: 'scale(1.03)'
                                  },
      
                          }}
                              key={i}
                          >
                              <CardActionArea onClick={()=>{handleCard(d.id, d.deadline)}}> 
                              <Grid container sx={{ padding: 2 }} spacing={1}>
                                  <Grid item xs={4}>
                                      <Stack direction="column" >
                                          <Typography variant="body2" sx={{
                                              color: "#0FA958",
                                              fontStyle: "normal",
                                              fontWeight: 700,
                                              fontSize: "17.2385px",
                                              lineHeight: "27px"
                                          }}>
                                              Starting Date     </Typography>
                                          <Typography variant="body2" sx={{color: "black"}}>
                                          {moment(d.created_date).format("MMMM Do YYYY")}</Typography>
      
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
                                          {d.subject} </Typography>
      
                                  </Grid>
      
                                  <Grid item xs={4}>
                                      <Stack direction="column">
                                          <Typography variant="body2" sx={{
                                              color: "#EAB531",
                                              fontStyle: "normal",
                                              fontWeight: 700,
                                              fontSize: "17.2385px",
                                              lineHeight: "27px"
                                          }}>
                                              Due Date
                                          </Typography>
                                          <Typography variant="body2" sx={{color: "black"}} >
                                          {moment(d.deadline).format("MMMM Do YYYY")}</Typography>
      
                                      </Stack>
      
                                  </Grid>
      
                                  <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                              <Typography variant="caption" >{d.status} </Typography> 
                                  </Grid>
      
                                  <Grid item xs={4} sx={{
                                      display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                                  }}>
                                     {d.status === "Work Completed"? <CheckCircleIcon sx={{ color: "#00e676"}}/> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
                                  </Grid>
                              </Grid>
                              </CardActionArea>
                          </Card>
                      )}
                  </Grid>
              </Box>
                :
                <>
                  {loading ? <CircularProgress /> :
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", marginTop: 2 }}>
                      <img src="/static/nodata.png" alt="No data" />
                    </Box>
                  }
                </> 
              }
            </Grid>
          </Container>
        </Grid>
      </Grid >
    </DashboardPage>

  );
}
