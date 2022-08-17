// MAIN FILE FOR NAVBAR 
import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton,Button, Typography } from '@mui/material';
// components
import SettingsIcon from '@mui/icons-material/Settings';
import Iconify from '../../components/Iconify';
import { useSelector } from 'react-redux';
import NotificationsPopover from './NotificationsPopover';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
const hello = "Hello ";

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',

  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
export default function DashboardNavbar({ onOpenSidebar }) {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate("/");
  }
  const handleLogout = () => {
    navigate("/dashboard/logout");
  }
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Typography variant='h3' sx={{ color: "#EAB531"}}> {hello} </Typography>
        <Typography variant='h3' sx={{ color: "black", marginLeft:"12px"}}> {user.firstName}!</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover />
          <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton {...bindTrigger(popupState)}>
            <SettingsIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{display: "flex", flexDirection: "column", padding:1}}>
              <Button onClick={handleDashboard}>Dashboard</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
