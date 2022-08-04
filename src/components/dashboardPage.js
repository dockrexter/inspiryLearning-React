import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const DashboardPage = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title}`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other} sx={{
            position: "fixed",
            marginTop: "10px",
            overflowY: "auto",
            '&::-webkit-scrollbar': {
            display: "none",
          }
        }}>
      {children}
    </Box>
  </>
));

DashboardPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default DashboardPage;
