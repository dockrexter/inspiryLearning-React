import React from 'react'
import { Grid, Typography, Stack, Button, Card, Checkbox } from '@mui/material';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import moment from 'moment';

//Assignment Users

const Assignments = ({ data }) => {
    const [checked, setChecked] = React.useState(false);
    console.log(data)
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6 }}>
                    List of Submmited Assignments      </Typography>
            </Grid>

            <Grid item xs={12}>
                {data.map((d, i) =>
                    <Card sx={{
                        background: "#E7F4F0",
                        boxShadow: "0px 7.69539px 7.69539px #195B48",
                        borderRadius: "15.3908px",
                        marginTop: 1

                    }}
                        key={i}
                    >
                        <Grid container sx={{ padding: 2 }} spacing={1}>
                            <Grid item xs={4}>
                                <Stack direction="column">
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
                                <Typography variant="caption" >
                                    {d.status} </Typography>
                            </Grid>

                            <Grid item xs={4} sx={{
                                display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                            }}>

                                <Checkbox disabled icon={<CircleUnchecked  />}/>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </Grid>
        </>
    );

}


export default Assignments;