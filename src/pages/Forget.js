import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { ForgetForm } from '../sections/auth/forget';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 0,
    background: "#38A585",

}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 550,
    margin: 'auto',
    minHeight: '100vh',
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
        <Page title="Login" style={{
            background: "#38A585",
        }}>
            <RootStyle>
                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h3" sx={{
                            px: 5, mt: 10, mb: 5
                        }}>
                            Inspiry Learning
                        </Typography>
                        <Typography variant="subtitle1" sx={{
                            px: 5, mb: 5,
                        }}>

                            Inspiry Learning is an affordable online homework service portal dedicated to delivering high-quality academic results. With our team of experts, we consistently deliver more than is expected. Whatever your academic level and background, we are here to help!
                        </Typography>

                    </SectionStyle>
                )}

                <Container sx={{
                    borderRadius: "90px 0px 0px 90px",
                    background: "#FFFFFF",
                    width: "100%"

                }}>
                    <ContentStyle >
                        <Box style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20 }} gutterBottom>
                            <img alt="login logo" src="/static/forget.svg" width={220} height={230} style={{ textAlign: "center" }} />
                        </Box>
                        <Typography variant="h2" gutterBottom sx={{
                            textAlign: "center", color: "#4F433C", lineHeight: "90px"
                        }}>
                            Forgot Password?
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{
                            textAlign: "center",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "25px",
                            lineHeight: "45px",
                            color: "rgba(79, 67, 60, 0.5)",
                            marginBottom: 5

                        }}>
                            Please Enter Your Email Adress To Recieve a Verification Code
                        </Typography>


                        <ForgetForm />


                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page >
    );
}
