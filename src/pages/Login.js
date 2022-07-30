import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../sections/auth/login';

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
  const { user } = useSelector(
    state => state.user
  );
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
            <Box style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10 }} gutterBottom>
              <img alt="login logo" src="/static/login.svg" width={220} height={180} style={{ textAlign: "center" }} />
            </Box>
            <Typography variant="subtitle1" gutterBottom sx={{
              textAlign: "center",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "36px",
              color: "#808084"
            }}>
              Need an Assignment Help?
            </Typography>
            <Typography variant="h2" gutterBottom sx={{
              textAlign: "center", color: "#4F433C", lineHeight: "90px"
            }}>
              Login as {user.role}
            </Typography>
            <LoginForm />
            {user.role === "user" ?
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle1" component={RouterLink} to="/register" color="secondary">
                  Get started
                </Link>
              </Typography>
              : null}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page >
  );
}
