
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import PPolicy from 'src/components/PPolicy';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//     top: 0,
//     zIndex: 9,
//     lineHeight: 0,
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     position: 'absolute',
//     padding: theme.spacing(3),
//     justifyContent: 'space-between',
//     [theme.breakpoints.up('md')]: {
//         alignItems: 'flex-start',
//         padding: theme.spacing(7, 5, 0, 7),
//     },
// }));

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
    maxWidth: 700,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // padding: theme.spacing(12, 0),


}));

const PrivacyPolicy = () => {
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');
  return (
    <Page title="Privacy Policy" style={{
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
                    <Typography variant="h5" gutterBottom sx={{
                     color: "#4F433C", lineHeight: "21px"
                    }}>
                        Privacy Policy
                    </Typography>
                    <PPolicy/>
                </ContentStyle>
            </Container>
        </RootStyle>
    </Page >
  )
}

export default PrivacyPolicy