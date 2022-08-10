import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';

// sections
import { AssignmentForm } from '../sections/auth/assignmentsubmission';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));




const ContentStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // padding: theme.spacing(12, 0),


}));

// ----------------------------------------------------------------------

export default function Login() {
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="Assignments" >
            <RootStyle >

                <Container sx={{
                    width: "100%",
                }}>
                    <ContentStyle >
                        <Box style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} >
                            <IconButton component={RouterLink} to="/dashboard/user" >
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Box>
                        <Box style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }} gutterBottom>
                            <img alt="login logo" src="/static/assignment.svg" width={220} height={120} />
                        </Box>

                        <Typography variant="h4" gutterBottom sx={{
                            textAlign: "center", color: "#4F433C", lineHeight: "41px", fontSize: "29.1146px", fontWeight: 700
                        }}>
                            Assignment Submission
                            Form

                        </Typography>
                        <Typography variant="body2" gutterBottom sx={{
                            textAlign: "center", color: "#202323", lineHeight: "31px", fontSize: "18.3802px", fontWeight: 400
                        }}>
                            You will be contacted within 2-3 hours

                        </Typography>
                        <Typography variant="caption" gutterBottom sx={{
                            textAlign: "center", color: "#38A585", lineHeight: "20px", fontSize: "13px", fontWeight: 700, textDecorationLine: "underline", marginBottom: 5
                        }}>
                            View All Submitted Assignments Forms
                        </Typography>

                        <AssignmentForm />

                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page >
    );
}
