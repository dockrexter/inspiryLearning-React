import { Grid, Container, Typography, Stack, Button, Card, Checkbox} from '@mui/material';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Page from '../components/Page';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'




// ----------------------------------------------------------------------

export default function AdminAssignmentDetails({assignData,assginId}) {
    const { user } = useSelector(state => state.user);
    let navigate = useNavigate(); 
   
    const handleClickDone = (e) => { 
        user.role === "admin" ? navigate("/auth/admin") : navigate("/dashboard/app");
    }
    return (
        <Page title="Dashboard" style={{ width: "100%", height: "100%", borderTop: "1.02801px solid #C0C0C2" }}>
            <Grid container sx={{ width: "100%", height: "100%" }} >
                <Grid item xs={7} sx={{
                    paddingTop: 2
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item xs={12}>
                                {assignData.filter(opt => opt.id === assginId).map((d ,i) =>
                                    <Card key={i} sx={{
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
                                                    {moment(d.deadline).format("MMMM Do YYYY")}   </Typography>

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
                                                    {d.subject}   </Typography>

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
                                                    {moment(d.created_date).format("MMMM Do YYYY")}     </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={4} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                                <Typography variant="caption" >
                                                    {d.status} </Typography>
                                            </Grid>

                                            <Grid item xs={4} sx={{
                                                display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
                                            }}>

                                                {d.status === "Work Completed"? <CheckCircleIcon sx={{ color: "#00e676"}}/> :  <Checkbox disabled icon={<CircleUnchecked  />}/>}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                )}
                            </Grid>

                            <Grid item xs={12} sx={{ marginTop: 5 }}>
                            {assignData.filter(opt => opt.id === assginId).map((d,i) =>
                                <Stack key={i} direction="column" spacing={2}>
                                    <Typography variant="h5" sx={{ color: "#4F433C", opacity: 0.7, fontWeight: 700 }}>
                                        Discription      </Typography>
                                    <Typography variant="body2" sx={{ color: "#202323", opacity: 0.6 }}>
                                        {d.summary}     </Typography>

                                    <Typography variant="h6" sx={{ color: "#6ABBA3", fontWeight: 700 }}>
                                        Attachments       </Typography>
                                </Stack>
                            )}
                            
                            </Grid>
                        </Grid>
                        <Button variant="contained"  size='large' onClick={handleClickDone} sx={{ width: "200px" }}>
                                 Done
                        </Button>

                    </Container>
                </Grid >
                <Grid item xs={5} sx={{ height: "100%", width: "100%" }} />




            </Grid >
        </Page >
    );
}
