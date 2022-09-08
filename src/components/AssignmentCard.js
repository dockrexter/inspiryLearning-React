import { Card, Grid, Stack,Checkbox, Typography, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';

const assignmentCard = ({d}) => {
    const { user } = useSelector(state => state.user);
  return (
    <Card sx={{
                width: "100%",
                background: "#E7F4F0",
                boxShadow: "0px 7.69539px 7.69539px #195B48",
                borderRadius: "15.3908px",
                marginTop: 1 }}>
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
                    <Typography variant="body2" >
                    {moment(d?.created_date).format("MMM DD YYYY LT")}
                    </Typography>

                </Stack>
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{
                    color: "#4F433C",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20.9339px",
                    lineHeight: "27px"
                }}>
                    {d?.subject}
                </Typography>
                {user.role === "admin" ? <Box sx={{display:"flex", flexDirection: "column",width: '30%', wordWrap: "break-word", alignItems: "center"}}>
                        <Typography variant="body2" sx={{
                        color: "#0FA958",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "17.2385px",
                        lineHeight: "27px"
                    }}>Assignee</Typography>
                        <Typography variant="caption" >{d?.assignee} </Typography>
                    </Box> : <></>}

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
                    <Typography variant="body2" >
                    {moment(d?.deadline).format("MMM DD YYYY LT")}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <Typography variant="caption" >
                    {d?.status == 0? "Work Completed" : d?.status == 1 ? "Work In Progress" : d?.status == 2 ? "New Request" : d?.status == 3 ? "Under Review" : d?.status == 4 ? "Pending Payment" : "Undefined Status"}
                </Typography>
            </Grid>

            <Grid item xs={4} sx={{
                display: "flex", alignItems: "flex-end", justifyContent: "flex-end", 
            }}>
                {d?.status === 0 ? <CheckCircleIcon sx={{ color: "#00e676"}}/> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
            </Grid>
        </Grid>
    </Card>
  )
}

export default assignmentCard