import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// @mui
import { Grid,Container,Typography, Button, Box, CircularProgress} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import DashboardPage from '../components/dashboardPage';
// sections
import { BackEndUrl } from '../url';
import AssignmentCardAction from 'src/components/AssignmentCardAction';



// ---------------------------------------------------------------------- //

export default function DashboardApp() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);
  
 // Calling Assignment Api For User
  const getAssignments = async () => {
    try {

      const res = await axios.get(`${BackEndUrl}/assignment/getAssignments?user_id=${user.user_id}`, {
        headers: {
          token: user.token
        }
      });
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
    getAssignments();
  }, []);
  return (
   <DashboardPage title="Dashboard" style={{
      marginTop: "2px" }}>
      <Grid container sx={{ width: "100%"}}>
      <Grid item xs={12} sx={{
                    paddingTop: 2,
                    overflowY: "scroll",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
          <Container maxWidth="xl">
            <Grid container sx={{height: "80vh"}}>
              <Grid item xs={12} sx={{ display:"flex", justifyContent:"space-between" }}>
                {/*Submit New Assignment Here*/}
                <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6, padding: 1 }}>
                  Submmited Assignments      </Typography>
                <Button size="medium" color="secondary" variant='contained' component={RouterLink} to="/dashboard/assignmentform" sx={{height:"50px"}} >
                  New Assignment
                </Button>
                
              </Grid>
              {assignments && assignments.length > 0 ?
                <Box sx={{
                  width: "1000px",
                  padding:2,
                  alignItems: "center",
                }}>
                  <Grid item xs={8} sx={{margin: "auto"}}>
                      {assignments.map((d ,i)=>
                          <AssignmentCardAction key={i} d={d}/>
                      )}
                  </Grid>
              </Box>
                :
                <>
                  {loading ? <CircularProgress /> :
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", marginTop: 2 }}>
                      <img src="/static/nodata.png" alt="No data" />
                    </Box>
                  }
                </> 
              }
            </Grid>
          </Container>
        </Grid>
      </Grid >
    </DashboardPage>

  );
}
