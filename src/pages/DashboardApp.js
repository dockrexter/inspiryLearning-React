import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// @mui
import { Grid, Container, Button, Box, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// components
import Page from '../components/Page';
// sections
import Assignments from '../sections/assignments/Assignments';
import Chat from '../sections/assignments/Chat';
import { BackEndUrl } from '../url';




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
    getAssignments();
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
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                {/*Submit New Assignment Here*/}
                <Button size="medium" color="secondary" variant='contained' component={RouterLink} to="/dashboard/assignmentform" >
                  Submit New Assignment Form
                </Button>
              </Grid>
              {assignments && assignments.length > 0 ?


                <Assignments data={assignments} />
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

        <Grid item xs={6} sx={{ background: "#F5F1F5", height: "100%", width: "100%" }}>
          <Chat />
        </Grid>

      </Grid >
    </Page >
  );
}
