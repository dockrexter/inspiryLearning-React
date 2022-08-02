import React from 'react'
import { Grid, Typography, Stack,Card, Checkbox, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { BackEndUrl } from '../../url';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//Assignment Users

const Assignments = ({ data }) => {
    const { user } = useSelector(state => state.user);
    const [status, setStatus] = useState("");
    const  handleStatusChange = (e) => {
        setStatus(e.target.value);
    }
     const handleStatus = async () => {
        try {
            const res = await axios.post(`${BackEndUrl}/assignment/changeStatus`, {
                id: "14" , 
                status: status
            },
            {
              headers: {
                token: user.token
              }
            },
            );
            if (res.data.status === "ok") {
              console.log("Status Has Been Updated..........!")
            }
          }
          catch (error) {
            console.log(error, "Status Update Failed........!");
          }}
        useEffect(()=>{
            {user.role === "admin" ? handleStatus() : null};
        },[status])
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
                        marginTop: 2

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
                                {user.role === "admin" ? <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                    {/* <InputLabel id="Status">{d.status}</InputLabel> */}
                                         <Select
                                            labelId="select_status"
                                            id="select_status"
                                            value={d.status}
                                            label="Status"
                                            onChange={handleStatusChange}>
                                                <MenuItem value="New Request">New Request</MenuItem>
                                                <MenuItem value="Under Review">Under Review</MenuItem>
                                                <MenuItem value="Pending Payment">Pending Payment</MenuItem>
                                                <MenuItem value="Work in Progress">Work in Progress</MenuItem>
                                                <MenuItem value="Work Completed">Work Completed</MenuItem>
                                            </Select>
                                        </FormControl> 
                                    : 
                                        <Typography variant="caption" >{d.status} </Typography> }
                                
                            </Grid>

                            <Grid item xs={4} sx={{
                                display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                            }}>

                               { d.status === "Work Completed"? <CheckCircleIcon /> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </Grid>
        </>
    );

}


export default Assignments;