import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BackEndUrl } from '../url';
import { Grid, Container, Box, styled, CircularProgress ,Typography, Stack,TextField, Card} from '@mui/material';
import {LocalizationProvider, StaticDatePicker, PickersDay} from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DashboardPage from '../components/dashboardPage';
import moment from 'moment';
import startOfDay from "date-fns/startOfDay";
import {Checkbox, CardActionArea} from '@mui/material';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdminAssignmentDetails from './AdminAssignmentDetails';
import { update } from 'src/redux/assignments';



const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "selected"
  })(({ theme, selected }) => ({
    ...(selected && {
      backgroundColor: "red",
      color: "white",
      "&:hover, &:focus": {
        backgroundColor: "#38A585",
      },
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%"
    })
  }));


// ------------------------ADMIN Assignment and Calender---------------------------------------------- //

export default function AdminHome() {
    const [value, setValue] = useState([startOfDay(new Date())]);
    const [cDate, setCDate] = useState(startOfDay(new Date()));
    const [dueDate, setDueDate] = useState(startOfDay(new Date()));
    const [assignmentsUp, setAssignmentsUp] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    const [month, setMonth] = useState(moment(new Date()).format('MM'));
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
    const [assginIdc, setAssignIDc] = useState(0);
    const [assignDetails, setAssignDetails] = useState(false);
    const dispatch = useDispatch();

   //................ASSIGNMENT................//

   const handleCard =() =>{
    dispatch(update(assginIdc));
    setAssignDetails(true);
    
}

  //.......................................................//

    const getAllAssignments = async() => {
        try {
         // console.log(user.token);
          const res = await axios.post(`${BackEndUrl}/assignment/getCurrentMonthAssignments`, {
            currentMonth: month,
            currentYear:  year,
          },
          {
            headers: {
              token: user.token
            }
          },
          );
          if (res.data.status === "ok") {
            setAssignmentsUp(res.data.assignments);
             for(var i=0; i < assignmentsUp.length; i++){
               const array = value; 
               const date = startOfDay(new Date(assignmentsUp[i].deadline));
               array.push(date);
              setValue(array);
            }
           setLoading(false);  
        }
        }
        catch (error) {
          console.error("falied to Fetch Assignments: ",error);
        }
      }
      const findDate = (dates, date) => {
        const dateTime = date.getTime();
        return dates.find((item) => item.getTime() === dateTime);
      };
      const renderPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
          return <PickersDay {...pickersDayProps} />;
        }
      const selected = findDate(value, date);
  
      return (
        <CustomPickersDay
          {...pickersDayProps}
          disableMargin
          selected={selected}
        />
      );
    }


      useEffect(() => {
        getAllAssignments();
      }, [assignmentsUp, month, year]);

    return (
      <>
      {assignDetails? <AdminAssignmentDetails assignData={assignmentsUp} assignId={assginIdc}/>:
      <DashboardPage title="Dashboard" style={{
        marginTop: "2px", borderTop: "1.02801px solid #C0C0C2" }}>
          <Grid container sx={{ width: "100%" }}>
              <Grid item xs={12} sx={{
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
                    <Container maxWidth="xl">
                        <Grid container 
                        alignItems="center"
                        justifyContent="center"
                        sx={{height: "80vh"}}>
                            <Grid item xs={8} sx={{width: "700px"}}>
                              <LocalizationProvider   dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                     sx={{color: "black"}}
                                        displayStaticWrapperAs="desktop"
                                        value={cDate}
                                        onMonthChange={(value)=>{
                                          setMonth(moment(value).format("MM"));
                                        }}
                                        onYearChange={(value)=>{
                                          setYear(moment(value).format("YYYY"));
                                        }}
                                        onChange={(newValue) => { 
                                          setDueDate(newValue); 
                                          }}
                                        renderDay={renderPickerDay}
                                        renderInput={(params) => <TextField {...params} />}
                                        inputFormat="'Week of' MMM d"    
                                  />
                                </LocalizationProvider>
                        </Grid>
                          <Grid item xs={8}>
                              <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between"}}>
                                  <Typography variant="body2" sx={{ color: "#4F433C", opacity: 0.8 }}>
                                        {moment(month).format('MMM')} {year}     </Typography>
                                    <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6 }}>
                                        List of applications received       </Typography>
                                </Stack>
                          </Grid>
                                {assignmentsUp && assignmentsUp.length > 0 ?
                                <Box sx={{
                                  width: "1000px",
                                  padding:2,
                                  alignItems: "center",
                                }}>
                                  <Grid item xs={8} sx={{margin: "auto"}}>
                                    <Typography>Due {moment(dueDate).format('DD MMM YYYY')}</Typography>
                                      {assignmentsUp.filter(opt => moment(opt.deadline).format('DD MMM YYYY') === moment(dueDate).format('DD MMM YYYY')).map((d ,i)=>
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
                                              <CardActionArea onClick={()=>{setAssignIDc(d.id);handleCard();}}> 
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
                                      <Typography sx={{marginTop: 5}}> All Due {moment(month).format('MMM')} {year}  </Typography>
                                      {assignmentsUp.map((d ,i)=>
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
                                              <CardActionArea onClick={()=>{setAssignIDc(d.id);handleCard();}}> 
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
                                {loading ?  <Box sx={{display: "flex", justifyContent: "space-around", height: "400px", width: "400px", marginTop: 3 }}>
                                  <CircularProgress size={80} />
                                </Box>
                                 : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "700px", width: "700px",      marginTop: 5 }}>
                                    <img src="/static/nodata.png" alt="No data" />
                                </Box>}
                                </>}
                        </Grid>
                    </Container>
                  </Grid >
              </Grid>
            </DashboardPage>
          }
          </>
    );
}