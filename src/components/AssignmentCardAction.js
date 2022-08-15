import { Card, CardActionArea,Checkbox, Grid, Stack, Typography,Box } from '@mui/material'
import moment from 'moment'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { update } from 'src/redux/assignments';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AssignmentCardAction = ({d}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(d);



    const handleCard =(id, deadline) =>{
        dispatch(update({id, deadline}));
        navigate('/dashboard/assigmentdetails');
    }



  return (
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

            <Grid item xs={8} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{
                    color: "#4F433C",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20.9339px",
                    lineHeight: "27px"
                }}>
                    {d.subject} </Typography>
                    <Box sx={{display:"flex", flexDirection: "column",width: '30%', wordWrap: "break-word", alignItems: "center"}}>
                        <Typography variant="body2" sx={{
                        color: "#0FA958",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "17.2385px",
                        lineHeight: "27px"
                    }}>Assignee</Typography>
                        <Typography variant="caption" >{d.assignee} </Typography>
                    </Box>

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
  )
}

export default AssignmentCardAction