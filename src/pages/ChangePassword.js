import { Link as RouterLink, Navigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
//import Logo from '../components/Logo';
// sections
import { ChangePasswordForm } from '../sections/auth/changepassword';
//import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));




const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 550,
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
        <Page title="ChangePassword" >
            <RootStyle >

                <Container sx={{
                    width: "100%",


                }}>
                    <ContentStyle >
                        <Box style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }} gutterBottom>
                            <img alt="login logo" src="/static/password.svg" width={220} height={180} />
                        </Box>

                        <Typography variant="h2" gutterBottom sx={{
                            textAlign: "center", color: "#4F433C", lineHeight: "90px"
                         }}>
                            Change Password

                        </Typography>



                        <ChangePasswordForm />


                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page >
    );
}
