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
import jwt_decode from 'jwt-decode'
import AdminMainHome from './pages/adminMainHome';
let decoded="";
// ----------------------------------------------------------------------  //

export default function Router() {
  const { user } = useSelector(
    state => state.user
  );
  const checkTokken=()=>{
    decoded = jwt_decode(user.token);
    // console.log("Decoded Token ",decoded);
    // console.log("Decoded Token ",decoded.role);
    // console.log("is token", user?.token)
  }
  user.token ? checkTokken() : null
  

  return useRoutes([
    {
      path: '/dashboard',
      element: user?.token ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { path: 'app', element: user?.token && decoded.role === "user" ? <DashboardApp /> : <Navigate to="/login" replace /> },
        { path: 'changepassword', element: user?.token ? <ChangePassword /> : <Navigate to="/login" replace />},
        { path: 'accountsettings', element: user?.token ? <Settings /> : <Navigate to="/login" replace /> },
        { path: 'assignmentform', element: user?.token ? <Assignment /> : <Navigate to="/login" replace /> },
        { path: 'adminassigmentdetails', element: user?.token ? <AdminAssignmentDetails /> : <Navigate to="/login" replace /> }

      ],
    },
    {
    path: '/auth',
    element: user?.token  && decoded.role === "admin" ? <AdminMainHome /> : <Navigate to= "/login" replace/>,
    children: [
      { path: 'admin', element: user?.token && decoded.role === "admin" ? <AdminHome /> : <Navigate to="/login" replace /> },
    ],
  },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Navigate to="/home" replace /> },
        { path: 'home', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Home /> },
        { path: 'login', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Login /> },
        { path: 'register', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Register/> },
        { path: 'forget', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Forget /> },
        { path: 'newpassword', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Password /> },
        { path: '/', element: user?.token && decoded.role === "admin" ? <Navigate to="/auth/admin" /> : <Navigate to="/home" replace /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
