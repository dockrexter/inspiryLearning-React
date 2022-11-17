import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import {navConfigUser, navConfigAdmin, navConfigSubAdmin} from './NavConfig';
import user from 'src/redux/user';
import { useSelector } from 'react-redux';
import IconButton from 'src/theme/overrides/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));


// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { user } = useSelector(state => state.user);
  const [ pathname,setpathName ] = useState(useLocation());

  const isDesktop = useResponsive('up', 'lg');
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Typography
          variant="h3">
          Inspiry Learning

        </Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        {/* <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link> */}
      </Box>
        {user.role === "admin" ? <NavSection navConfig={navConfigAdmin} /> : user.role === "subadmin" ? <NavSection navConfig={navConfigSubAdmin} /> : <NavSection navConfig={navConfigUser} /> }
      <Box sx={{ flexGrow: 1 }}/>
      
    </Scrollbar>
  );

  return (
    <RootStyle style={{
      backgroundColor: "#38A585",
      borderRadius: "51.8089px 1000px 100px 51.8089px"
    }}>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: '#38A585',
              borderRightStyle: 'dashed',
              borderRadius: "0px 51.8089px 51.8089px 0px"
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: '#38A585',
              borderRightStyle: 'dashed',
              borderRadius: "0px 51.8089px 51.8089px 0px"


            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
