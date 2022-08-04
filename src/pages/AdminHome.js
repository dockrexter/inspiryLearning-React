import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Assignments from 'src/sections/assignments/Assignments';
import { BackEndUrl } from '../url';
import { Grid, Container, Box, styled, CircularProgress ,Typography, Stack,TextField, Card} from '@mui/material';
import {LocalizationProvider, StaticDatePicker, PickersDay} from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DashboardPage from '../components/dashboardPage';
import moment from 'moment';
import startOfDay from "date-fns/startOfDay";
import Chat from '../sections/assignments/Chat'



const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "selected"
  })(({ theme, selected }) => ({
    ...(selected && {
      backgroundColor: "red",
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark
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
    console.log("CHECKING START DATE on start:",value);
    const [cDate, setCDate] = useState(startOfDay(new Date()));
    //console.log(value);
    const [assignmentsUp, setAssignmentsUp] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    const [month, setMonth] = useState(moment(new Date()).format('MM'));
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
   // console.log(user.token, "TOKEN");

   //................PIcker Date................//
   

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
             for(var i=0; i < res.data.assignments.length; i++){
               const date = startOfDay(new Date(res.data.assignments[i].deadline));
               console.log("CHECKING DATES With new Date: ",date);
              setValue([...value, date]);
            }
           setLoading(false);  
        }
        }
        catch (error) {
          console.error("falied to Fetch Assignments: ",error);
        }
      }
      // const findIndexDate = (dates, date) => {
      //   const dateTime = date.getTime();
      //   return dates.findIndex((item) => item.getTime() === dateTime);
      // };
      const findDate = (dates, date) => {
        const dateTime = date.getTime();
        console.log("CHECKING on findDate Function DATE:",dateTime);
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
      };

      useEffect(() => {
        getAllAssignments();
        console.log("CHECK THIS Assignments OUT:",assignmentsUp);
        console.log("CHECK OUT COMPLETE ARRAY:",value);
      }, [month, year]);
  

    return (
      <DashboardPage title="Dashboard" style={{
        marginTop: "2px", borderTop: "1.02801px solid #C0C0C2" }}>
          <Grid container sx={{ width: "100%" }}>
              <Grid item xs={6} sx={{
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2,
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
                    <Container maxWidth="xl">
                        <Grid container sx={{height: "80vh"}}>
                            <Grid item xs={12}>
                              <LocalizationProvider   dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker sx={{width: "100%", color: "white"}}
                                        displayStaticWrapperAs="desktop"
                                        value={value}
                                        onMonthChange={(value)=>{
                                          setMonth(moment(value).format("MM"));
                                        }}
                                        onYearChange={(value)=>{
                                          setYear(moment(value).format("YYYY"));
                                        }}
                                        onChange={(newValue) => {  
                                          console.log("CHANGED VALUE from function: ",newValue);
                                          }}
                                        renderDay={renderPickerDay}
                                        renderInput={(params) => <TextField {...params} />}
                                        inputFormat="d MMM YYYY"    
                                  />
                                </LocalizationProvider>
                        </Grid>
                          <Grid item xs={12}>
                              <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "#4F433C", opacity: 0.8 }}>
                                        {moment(cDate).format('MMM YYYY')}      </Typography>
                                    <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6 }}>
                                        List of applications received       </Typography>
                                </Stack>
                          </Grid>
                                {assignmentsUp && assignmentsUp.length > 0 ?
                                <Assignments data={assignmentsUp}/>
                                :
                                <>
                                {loading ?  <CircularProgress />
                                 : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%",      marginTop: 2 }}>
                                    <img src="/static/nodata.png" alt="No data" />
                                </Box>}
                                </>}
                        </Grid>
                    </Container>
                  </Grid >
                <Grid item xs={6} sx={{height: "100%", width: "100%"}}>
                  <Chat />
                </Grid>
              </Grid>
            </DashboardPage>
    );
}


/*
<Page title="Dashboard" style={{ width: "100%", height: "100%", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}> 
            </Grid >
        </Page >
        */