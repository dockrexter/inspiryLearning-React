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
import SubAdminRegisterForm from 'src/sections/auth/register/SubAdmin';
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

export default function SubAdmin() {
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="ChangePassword" >
            <RootStyle >

                <Container sx={{
                    width: "100%",


                }}>
                    <ContentStyle >
                       <Typography variant="h2" gutterBottom sx={{
                            textAlign: "center", color: "#4F433C", lineHeight: "90px"
                         }}>
                            Add SubAdmin

                        </Typography>



                        <SubAdminRegisterForm/>


                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page >
    );
}
