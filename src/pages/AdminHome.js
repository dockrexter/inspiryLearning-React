import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Assignments from 'src/sections/assignments/Assignments';
import { BackEndUrl } from '../url';
import { Grid, Container, styled, CircularProgress ,Typography, Stack,TextField, Card} from '@mui/material';
import Fab from '@mui/material/Fab';
import {LocalizationProvider, StaticDatePicker, PickersDay} from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
//import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Page from '../components/Page';
import moment from 'moment';
//import  PickersDay from '@mui/lab/PickersDay';
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
    console.log(value, "Current Date");
    const [cDate, setCDate] = useState(startOfDay(new Date()));
    console.log(value);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    console.log(user.token, "TOKEN");

    const getAllAssignments = async() => {
        try {
          console.log(user.token);
          const res = await axios.post(`${BackEndUrl}/assignment/getCurrentMonthAssignments`, {
            currentMonth: moment(cDate).format("MM"),
            currentYear:  moment(cDate).format("yyyy"),
          },
          {
            headers: {
              token: user.token
            }
          },
          );
          if (res.data.status === "ok") {
            setAssignments(res.data.assignments);
            console.log(assignments);
            setLoading(false);
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getAllAssignments();
      }, [cDate]);

      // const array = [...value];
      // const index = findIndexDate(array, date);
      // if (index >= 0) {
      //   array.splice(index, 1);
      // } else {
      //   array.push(date);
      // }
      // setValue(array);
      


      const findIndexDate = (dates, date) => {
        const dateTime = date.getTime();
        return dates.findIndex((item) => item.getTime() === dateTime);
      };
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
      };

    return (
      <Page title="Dashboard" style={{ width: "100%", height: "80%", borderTop: "1.02801px solid #C0C0C2" }}>
          <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid item xs={6} sx={{
                    overflow: "auto",
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2,
                    height: "80vh",
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
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item xs={12}>
                              <LocalizationProvider   dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={value}
                                        onChange={(newValue) => {
                                            //copying the values array 
                                            const array = [...value];
                                            const date = startOfDay(newValue);
                                            setCDate(startOfDay(newValue));
                                            const index = findIndexDate(array, date);
                                            if (index >= 0) {
                                              array.splice(index, 1);
                                            } else {
                                              array.push(date);
                                            }
                                            setValue(array);
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
                                {assignments && assignments.length > 0 ?
                                <Assignments data={assignments} />
                                :
                                <>
                                {loading ? <CircularProgress />
                                 : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%",      marginTop: 2 }}>
                                    <img src="/static/nodata.png" alt="No data" />
                                </Box>}
                                </>}
                        </Grid>
                    </Container>

                  </Grid >
                <Grid item xs={6} sx={{position: "sticky", height: "100%", width: "100%", paddingTop: 2 }}>
                  <Chat />
                </Grid>
              </Grid>
            </Page>
    );
}


/*
<Page title="Dashboard" style={{ width: "100%", height: "100%", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}> 
            </Grid >
        </Page >
        */