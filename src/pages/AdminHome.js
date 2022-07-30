import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Assignments from 'src/sections/assignments/Assignments';
import { BackEndUrl } from '../url';
import { Grid, Container, CircularProgress ,Typography, Stack, Card} from '@mui/material';
import Fab from '@mui/material/Fab';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Page from '../components/Page';


// ------------------------ADMIN Assignment and Calender---------------------------------------------- //

export default function AdminHome() {
    const [value, setValue] = useState(new Date());
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.user);
    const testValue = "Sat Jul 09 2022 00:49:57 GMT+0500 (Pakistan Standard Time)";

    const getAllAssignments = async() => {
        try {
          const res = await axios.get(`${BackEndUrl}/assignment/getAllAssignmentsAdmin`, {
            headers: {
              token: user.token
            },
            // body: {
                
            // }
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
        getAllAssignments();
      }, []);

    return (
        <Page title="Dashboard" style={{ width: "100%", height: "100%", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}>
                <Grid item xs={6} sx={{
                    borderRight: "1.02801px solid #C0C0C2",
                    paddingTop: 2
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={value}
                                        sx={{ color: "red" }}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                            console.log(newValue, "ALL OKAY");
                                        }}
                                        // renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" sx={{ color: "#4F433C", opacity: 0.8 }}>
                                        13, May 2022       </Typography>
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
                <Grid item xs={6} sx={{ background: "#F5F1F5", height: "100%", width: "100%" }}>

                    <Stack direction="column" spacing={2} sx={{ display: "flex", width: "100%", alignItems: "flex-end", padding: 2 }}>
                        <Typography variant='body1' sx={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "18.902px",
                            lineHeight: "21px",
                            color: "#1E1100",
                            opacity: 0.5,

                        }}>
                            Yesterday
                        </Typography>
                        <Card sx={{
                            background: "#E7F4F0",
                            boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
                            borderRadius: "8.03922px", width: "80%", padding: 2
                        }}>
                            <Typography variant='body2' sx={{
                                fontFamily: 'Poppins',
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "14.0784px",
                                lineHeight: "21px",
                                color: "#4F433C",
                                opacity: 0.7
                            }}>
                                i need proper assignment according to my requirements which i have added bellow in aattched document. What type of requirements from me you need in this assignment?
                            </Typography>


                        </Card>
                        <Typography variant='caption' sx={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "10.8628px",
                            lineHeight: "21px",
                            color: "#1E1100",
                            opacity: 0.5
                        }}>
                            Yesterday 13:37 PM                </Typography>
                    </Stack>

                    <Stack direction="column" spacing={2} sx={{ display: "flex", width: "100%", alignItems: "flex-start", padding: 2 }}>
                        {/* <Typography variant='body1' sx={{
                fontFamily: 'Poppins',
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "18.902px",
                lineHeight: "21px",
                color: "#1E1100",
                opacity: 0.5,

              }}>
                Yesterday
              </Typography> */}
                        <Card sx={{
                            background: "#FFFFFF",
                            boxShadow: "0px 3.21569px 8.03922px rgba(0, 0, 0, 0.19)",
                            borderRadius: "8.03922px", width: "80%", padding: 2
                        }}>
                            <Typography variant='body2' sx={{
                                fontFamily: 'Poppins',
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "14.0784px",
                                lineHeight: "21px",
                                color: "#4F433C",
                                opacity: 0.7
                            }}>
                                Hello Marley, everything is ok? What type of help you needin this assignment?                </Typography>



                        </Card>

                        <Typography variant='caption' sx={{
                            fontFamily: 'Poppins',
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "10.8628px",
                            lineHeight: "21px",
                            color: "#1E1100",
                            opacity: 0.5
                        }}>
                            Yesterday 13:37 PM                </Typography>
                    </Stack>

                    <Fab variant="extended" size="large" color="primary" aria-label="add" sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        padding: 4,

                    }}>
                        <Stack direction="row" spacing={2} sx={{
                            display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            <img alt="camera" src="/static/camera.svg" width={30} height={30} />
                            <Typography variant="body2" sx={{
                                color: "#FFFFFF",
                                opacity: 0.8
                            }}> Type Your Message </Typography>
                            <img alt="attachment" src="/static/attachment.svg" width={30} height={30} />
                            <img alt="send" src="/static/send.svg" width={35} height={35} />

                        </Stack>


                    </Fab>

                </Grid>

            </Grid >
        </Page >
    );
}
