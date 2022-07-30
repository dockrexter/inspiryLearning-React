import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container, Typography, Stack, Button, Card, Checkbox, TextField } from '@mui/material';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { Link as RouterLink } from 'react-router-dom';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections


const data = [{
    due: "10-6-22",
    start: "10-6-22",
    title: "History of Graphic Design",
    status: "Work in progress"

},

]


// ----------------------------------------------------------------------

export default function AdminAssignmentDetails() {
    const [value, setValue] = useState(new Date());
    return (
        <Page title="Dashboard" style={{ width: "100%", height: "100%", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%", height: "100%" }} >
                <Grid item xs={7} sx={{
                    paddingTop: 2
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item xs={12}>
                                {data.map(d =>
                                    <Card sx={{
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
                                                        {d.due}   </Typography>

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
                                                    {d.title}   </Typography>

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
                                                        {d.start}     </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                                <Typography variant="caption" >
                                                    {d.status} </Typography>
                                            </Grid>

                                            <Grid item xs={4} sx={{
                                                display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                                            }}>

                                                <Checkbox
                                                    icon={<CircleUnchecked />}
                                                    checkedIcon={<CircleCheckedFilled />}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                )}
                            </Grid>

                            <Grid item xs={12} sx={{ marginTop: 5 }}>
                                <Stack direction="column" spacing={2} >
                                    <Typography variant="h5" sx={{ color: "#4F433C", opacity: 0.7, fontWeight: 700 }}>
                                        Discription       </Typography>
                                    <Typography variant="body2" sx={{ color: "#202323", opacity: 0.6 }}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                        optio, eaque rerum! Provident similique accusantium nemo autem.       </Typography>

                                    <Typography variant="h6" sx={{ color: "#6ABBA3", fontWeight: 700 }}>
                                        Attachments       </Typography>

                                    <Button variant="contained" color="primary" size="large" sx={{ width: "200px" }}>
                                        Done
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Container>
                </Grid >
                <Grid item xs={5} sx={{ height: "100%", width: "100%" }} />




            </Grid >
        </Page >
    );
}
