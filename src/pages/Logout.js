import React from 'react'
import { Box, Container, styled, Typography, Button } from '@mui/material';
import Page from '../components/Page'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom';

const LogoutStyled = styled(Box)(({theme})=> ({
    width: "400px",
    height: "300px",
    boxSizing: "border-box",
    backgroundColor: 'white',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "10px",
    textAlign: "center" 

}));
const RootStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
      display: 'flex',
  },
}));
const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 550,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  // padding: theme.spacing(12, 0),


}));

const Logout = () => {
  const navigate = useNavigate();
  console.log("HELLO FROM LOGOUT");
  const handleLogout = (e) => {
    window.localStorage.clear();
    setTimeout(navigate("/", { replace: true }),5000);
    // navigate("/home", { replace: true });
  }
  const handleDashboard = (e) => {
    setTimeout(navigate("/", {replace: true}), 5000)
  }
    //window.localStorage.clear();   
  return (
    <Page title="Logout">
      <RootStyle>
        <Container sx={{ width: "100%"}}>
          <ContentStyle>
            <LogoutStyled>
              <>
                <Typography variant="h3" gutterBottom sx={{
                    textAlign: "center", color: "#4F433C", lineHeight: "90px"
                    }}>
                      Logout?
                </Typography>
              </>
              <>
                <LogoutIcon sx={{ fontSize: 80, display: 'inline-block',
                  width: '100%', color: "#2196f3",
                }}/>
              </>
              <Box>
                <Button variant="contained" onClick={handleLogout} sx={{margin:"30px"}}>Logout</Button>
                <Button variant="contained" onClick={handleDashboard} sx={{margin:"30px"}}>Cancel</Button>
              </Box>
            </LogoutStyled>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}

export default Logout