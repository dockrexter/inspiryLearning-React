import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BackEndUrl } from '../url';
import { Grid, Container, Box, styled, CircularProgress ,Typography, Stack,TextField} from '@mui/material';
import {LocalizationProvider, StaticDatePicker, PickersDay} from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DashboardPage from '../components/dashboardPage';
import moment from 'moment';
import startOfDay from "date-fns/startOfDay";
import AssignmentCardAction from 'src/components/AssignmentCardAction';



const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "selected"
  })(({ theme, selected}) => ({
     
    ...(selected && {
      backgroundColor: "red",
      color: "white",
      "&.MuiPickersDay-today":{
        backgroundColor: "#38A585",
      },
      "&:hover, &:focus": {
        backgroundColor: "#38A585",
      },
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%"
    }),
  }));


// ------------------------ADMIN Assignment and Calender---------------------------------------------- //

export default function AdminHome() {
    const [value, setValue] = useState([startOfDay(new Date())]);
    const [cDate, setCDate] = useState(startOfDay(new Date()));
    const [dueDate, setDueDate] = useState(startOfDay(new Date()));
    const [assignmentsUp, setAssignmentsUp] = useState([]);
    const [assignmentsDue, setAssignmentsDue] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    const [month, setMonth] = useState(moment(new Date()).format('MM'));
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));

   //................ASSIGNMENT................//

    const getAllAssignments = async() => {
        try {
          const res = await axios.post(`${BackEndUrl}/api/assignments/getCurrentMonthAssignments`, {
            current_month: month,
            current_year:  year,
          },
          {
            headers: {
              token: user.token
            }
          },
          );
          if (res.data.status === "ok") {
            setAssignmentsUp(res.data.data);
            setLoading(false);  
        }
        }
        catch (error) {
          console.error("falied to Fetch Assignments: ",error);
        }
      }
      //.................................................//
      const getAllAssignmentsDue = async() => {
        try {
          const res = await axios.post(`${BackEndUrl}/api/assignments/getAllDueAssignments`, {
            current_date: moment(cDate).format('DD MM YYYY'),
          },
          {
            headers: {
              token: user.token
            }
          },
          );
          if (res) {
            console.log(res)
            setAssignmentsDue(res.data.data);  
        }
        }
        catch (error) {
          console.error("falied to Fetch Due Assignments: ",error);
        }
      }

      //.................Custom Calenter Functions..............//
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
        <>
        <CustomPickersDay
          {...pickersDayProps}
          disableMargin
          selected={selected}
        />
        </>
      );
    }
    
    //............//
    useEffect(()=>{
      for(var i=0; i < assignmentsUp.length; i++){
        const array = value; 
        const date = startOfDay(new Date(assignmentsUp[i].deadline));
        array.push(date);
        setValue(array);
     }
    },[assignmentsUp])


      useEffect(() => {
        getAllAssignments();
        getAllAssignmentsDue();
      }, [month, year]);

    return (
      <DashboardPage title="Dashboard" style={{
        marginTop: "2px", borderTop: "1.02801px solid #C0C0C2"}}>
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
                        sx={{height: "80vh"}}
                        >
                            <Grid item xs={12} md={8} sx={{width: "100%"}}>
                              <LocalizationProvider   dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                     sx={{ }}
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
                                        inputFormat="dd MMM yyyy"    
                                  />
                                </LocalizationProvider>
                        </Grid>
                          <Grid item xs={12} md={8}>
                              <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between"}}>
                                  <Typography variant="body2" sx={{ color: "#4F433C", opacity: 0.8 }}>
                                       Current Date: {moment(cDate).format('DD MMM YYYY')}</Typography>
                                    <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6 }}>
                                        List of applications received       </Typography>
                                </Stack>
                          </Grid>
                                {(assignmentsUp && assignmentsUp.length > 0)  || (assignmentsDue && assignmentsDue.length > 0) ?
                                <Box sx={{
                                  width: "100%",
                                  padding:2,
                                  alignItems: "center",
                                }}>
                                  <Grid item xs={12} md={8} sx={{margin: "auto", padding:1}}>
                                    {assignmentsUp.filter(opt => moment(opt.deadline).format('DD MMM YYYY') === moment(dueDate).format('DD MMM YYYY')).length > 0 ? 
                                    <>
                                    <Typography>Due {moment(dueDate).format('DD MMM YYYY')}</Typography>
                                      {assignmentsUp.filter(opt => moment(opt.deadline).format('DD MMM YYYY') === moment(dueDate).format('DD MMM YYYY')).map((d ,i)=>
                                            <AssignmentCardAction key={i} d={d} />
                                          )}
                                    </> : moment(cDate).format("MM DD YYYY") === moment(dueDate).format("MM DD YYYY") ? <></> : 
                                  
                                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60%", width: "60%",      margin: "auto" }}>
                                    <img src="/static/nodata.png" alt="No data" />
                                  </Box>}
                                      {moment(cDate).format("MM DD YYYY") === moment(dueDate).format("MM DD YYYY")?
                                      <>
                                      <Typography sx={{marginTop: 5}}> All Due Assignments  </Typography>
                                      {assignmentsDue.length > 0? assignmentsDue.map((d ,i)=>
                                          <AssignmentCardAction key={i} d={d} />
                                      ): <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60%", width: "60%",      margin: "auto" }}>
                                      <img src="/static/nodata.png" alt="No data" />
                                  </Box>}
                                      </>
                                      :
                                      null
                                    }
                                  </Grid>
                              </Box>
                                :
                                <>
                                {loading ?  <Box sx={{display: "flex", justifyContent: "space-around", height: "50%", width: "50%", marginTop: 3 }}>
                                  <CircularProgress size={80} />
                                </Box>
                                 : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60%", width: "60%",      margin: "auto" }}>
                                    <img src="/static/nodata.png" alt="No data" />
                                </Box>}
                                </>}
                        </Grid>
                    </Container>
                  </Grid >
              </Grid>
            </DashboardPage>
    );
}