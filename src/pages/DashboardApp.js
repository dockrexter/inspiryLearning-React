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

      const res = await axios.get(`${BackEndUrl}/api/assignments/getUserAssignments`, {
        headers: {
          token: user.token
        }
      });
      if (res.data.status === "ok") {
        setAssignments(res.data.data);
        setLoading(false);
      }
    }
    catch (error) {
      console.error("user Assignments: ",error);
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
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                    display: "none",
                    },
                }}>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
                  sx={{height: "80vh"}}>
              <Grid item xs={12} sx={{ display:"flex", justifyContent:"space-between", width:"100%", padding: 1 }}>
                {/*Submit New Assignment Here*/}
                <Typography variant="caption" sx={{ color: "#202323", opacity: 0.6, padding: 1 }}>
                  Submmited Assignments      </Typography>
                <Button size="medium" color="secondary" variant='contained' component={RouterLink} to="/dashboard/assignmentform" sx={{height:"50px"}} >
                  New Assignment
                </Button>
                
              </Grid>
              {assignments && assignments.length > 0 ?
                <Box sx={{
                  width: "100%",
                  padding:2,
                  alignItems: "center",
                }}>
                  <Grid item xs={12} md={8}  sx={{margin: "auto"}}>
                      {assignments.map((d ,i)=>
                          <AssignmentCardAction key={i} d={d}/>
                      )}
                  </Grid>
              </Box>
                :
                <>
                  {loading ? <CircularProgress /> :
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%", width: "50%", margin:"auto" }}>
                      <img src="/static/nodata.png" alt="No data" />
                    </Box>
                  }
                </> 
              }
            </Grid>
        </Grid>
      </Grid >
    </DashboardPage>

  );
}
