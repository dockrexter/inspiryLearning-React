import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import Login from './pages/Login';
import Forget from './pages/Forget';
import Password from './pages/Password';


import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import ChangePassword from './pages/ChangePassword';
import Settings from './pages/Settings';
import Assignment from "./pages/Assignment"
import AdminAssignmentDetails from "./pages/AdminAssignmentDetails"
import AdminHome from "./pages/AdminHome"
import Home from './pages/Home';
// import jwt_decode from 'jwt-decode'
import Logout from './pages/Logout';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PaswordReset from './pages/PassWordReset';
import AssignmentDetailsNotify from './pages/AssignmentDetailsNotify';
import SubAdmin from './pages/SubAdmin';
import { useEffect } from 'react';
// ----------------------------------------------------------------------  //

export default function Router() {
  const { user } = useSelector(
    state => state.user
  );
  return useRoutes([
    {
      path: '/dashboard',
      element: user?.token ? <DashboardLayout /> : <Navigate to="/home" replace />,
      children: [
        { path: 'user', element: user?.token && user?.role === "user" ? <DashboardApp /> : <Navigate to="/home" replace /> },
        { path: 'admin', element: user?.token && user?.role === "admin" || user?.role == "subadmin" ? <AdminHome /> : <Navigate to="/home" replace /> },
        { path: 'changepassword', element: user?.token ? <ChangePassword /> : <Navigate to="/home" replace />},
        { path: 'addsubadmin', element: user?.token && user?.role === "admin" ? <SubAdmin/> : <Navigate to="/home" replace />},
        { path: 'accountsettings', element: user?.token ? <Settings /> : <Navigate to="/home" replace /> },
        { path: 'assignmentform', element: user?.token && user?.role === "user" ? <Assignment /> : <Navigate to="/home" replace /> },
        { path: 'assigmentdetails', element: user?.token ? <AdminAssignmentDetails /> : <Navigate to="/home" replace /> },
        { path: 'assignmentdetailsnotify', element: user?.token ? <AssignmentDetailsNotify /> : <Navigate to="/home" replace /> },
        { path: 'logout', element: user?.token ? <Logout/> : <Navigate to="/home" replace />},
        { path: 'newpassword', element: user?.token? <Password/> : <Navigate to="/home" replace />},

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: user?.token && user?.role === "user" ? <Navigate to="/dashboard/user" /> : <Navigate to="/home" replace /> },
        { path: '/', element: user?.token && user?.role === "admin" || user?.role == "subadmin" ? <Navigate to="/dashboard/admin" /> : <Navigate t0="home" replace/> },
        { path: 'home', element: user?.token && user?.role === "admin" || user?.role === "subadmin" ? <Navigate to="/dashboard/admin" replace /> : <Home/> },
        { path: 'home', element: user?.token && user?.role === "user" ? <Navigate to="/dashboard/user" replace/> : <Home /> },
        { path: 'login', element: user?.token && user?.role === "user" ? <Navigate to="/dashboard/user" replace/> : user.role? <Login/> 
        :
        <Navigate to="/home" replace /> },
        { path: 'login', element: user?.token && user?.role === "admin" || user?.role === "subadmin"? <Navigate to="/dashboard/admin" /> : user.role? <Login/> 
        :
        <Navigate to="/home" replace /> },
        { path: 'register', element: user?.token && user?.role === "user"? <Navigate to="/dashboard/user" /> : <Register/> },
        { path: 'forget', element: user?.token && user?.role === "user"? <Navigate to="/dashboard/user" /> : <Forget /> },
        { path: 'forget', element: user?.token && user?.role === "admin" || user?.role === "subadmin" ? <Navigate to="/dashboard/admin" /> : <Forget /> },
        { path: `resetPassword`, element: user?.token && user?.role === "admin" || user?.role === "subadmin" ? <Navigate to="/dashboard/admin" /> : <PaswordReset/> },
        { path: 'termsandconditions', element: <TermsAndConditions/> },
        { path: 'privacypolicy', element: <PrivacyPolicy/> },

        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
