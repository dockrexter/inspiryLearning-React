// import React from 'react'
// import { Grid, Typography, Stack,Card, Box, Checkbox, CardActionArea} from '@mui/material';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { useState } from 'react';
// import { BackEndUrl } from '../../url';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
// import { useEffect } from 'react';


// //Assignment Users

// const Assignments = ({data}) => {
    
//     const [assginId, setAssignID] = useState(0);
//     const { user } = useSelector(state => state.user);
//     const [status, setStatus] = useState("");
//     //...............................................//


//     //assignmentChange(assginId);

//     //................................................//
//     const handleCard =(e) =>{
//         setAssignID(e.target.value);
//     }
//      const handleStatus = async (e) => {
//         setStatus(e.target.value);
//         try {
//             const res = await axios.post(`${BackEndUrl}/assignment/changeStatus`, {
//                 id: "14" , 
//                 status: status
//             },
//             {
//               headers: {
//                 token: user.token
//               }
//             },
//             );
//             if (res.data.status === "ok") {
//             }
//           }
//           catch (error) {
//           }}
//     return (
//         <Box sx={{
//             width: "100%",
//             padding:2
//           }}>
//             <Grid item xs={12}>
//                 {data.map((d, i) =>
//                     <Card sx={{
//                         background: "#E7F4F0",
//                         boxShadow: "0px 7.69539px 7.69539px #195B48",
//                         borderRadius: "15.3908px",
//                         marginTop: 3,
//                         transition: '0.3s',
//                         '&:hover': {
//                             transform: 'scale(1.03)'
//                             },

//                     }}
//                         key={i}
//                     >
//                         <CardActionArea onClick={event => setAssignID(d.id)}>
//                         <Grid container sx={{ padding: 2 }} spacing={1}>
//                             <Grid item xs={4}>
//                                 <Stack direction="column">
//                                     <Typography variant="body2" sx={{
//                                         color: "#0FA958",
//                                         fontStyle: "normal",
//                                         fontWeight: 700,
//                                         fontSize: "17.2385px",
//                                         lineHeight: "27px"
//                                     }}>
//                                         Starting Date     </Typography>
//                                     <Typography variant="body2" sx={{color: "black"}}>
//                                     {moment(d.created_date).format("MMMM Do YYYY")}</Typography>

//                                 </Stack>

//                             </Grid>

//                             <Grid item xs={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                                 <Typography variant="subtitle1" sx={{
//                                     color: "#4F433C",
//                                     fontStyle: "normal",
//                                     fontWeight: 700,
//                                     fontSize: "20.9339px",
//                                     lineHeight: "27px"
//                                 }}>
//                                     {d.subject} </Typography>

//                             </Grid>

//                             <Grid item xs={4}>
//                                 <Stack direction="column">
//                                     <Typography variant="body2" sx={{
//                                         color: "#EAB531",
//                                         fontStyle: "normal",
//                                         fontWeight: 700,
//                                         fontSize: "17.2385px",
//                                         lineHeight: "27px"
//                                     }}>
//                                         Due Date
//                                     </Typography>
//                                     <Typography variant="body2" sx={{color: "black"}} >
//                                     {moment(d.deadline).format("MMMM Do YYYY")}</Typography>
//                                 </Stack>
//                             </Grid>
//                             <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
//                                         <Typography variant="caption" >{d.status} </Typography> 
//                             </Grid>

//                             <Grid item xs={4} sx={{
//                                 display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
//                             }}>
//                                {d.status === "Work Completed" ? <CheckCircleIcon sx={{ color: "#00e676"}}/> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
//                             </Grid>
//                         </Grid>
//                         </CardActionArea>
//                     </Card>
//                 )}
//             </Grid>
//         </Box>
//     );

// }


// export default Assignments;