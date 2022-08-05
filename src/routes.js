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
import Logout from './pages/Logout';
let decoded="";
// ----------------------------------------------------------------------  //

export default function Router() {
  const { user } = useSelector(
    state => state.user
  );
  const checkTokken=()=>{
    decoded = jwt_decode(user.token);}
  user.token ? checkTokken() : null
  

  return useRoutes([
    {
      path: '/dashboard',
      element: user?.token ? <DashboardLayout /> : <Navigate to="/home" replace />,
      children: [
        { path: 'app', element: user?.token && decoded.role === "user" ? <DashboardApp /> : <Navigate to="/home" replace /> },
        { path: 'changepassword', element: user?.token ? <ChangePassword /> : <Navigate to="/home" replace />},
        { path: 'accountsettings', element: user?.token ? <Settings /> : <Navigate to="/home" replace /> },
        { path: 'assignmentform', element: user?.token && decoded.role === "user" ? <Assignment /> : <Navigate to="/home" replace /> },
        { path: 'adminassigmentdetails', element: user?.token ? <AdminAssignmentDetails /> : <Navigate to="/home" replace /> },
        { path: 'logout', element: user?.token ? <Logout/> : <Navigate to="/home" replace />},
        { path: 'newpassword', element: user?.token? <Password/> : <Navigate to="/home" replace />},

      ],
    },
    {
    path: '/auth',
    element: user?.token  && decoded.role === "admin" ? <AdminMainHome /> : <Navigate to= "/home" replace/>,
    children: [
      { path: 'admin', element: user?.token && decoded.role === "admin" ? <AdminHome /> : <Navigate to="/home" replace /> },
      { path: 'changepassword', element: user?.token ? <ChangePassword /> : <Navigate to="/home" replace />},
      { path: 'accountsettings', element: user?.token ? <Settings /> : <Navigate to="/home" replace /> },
      { path: 'adminassigmentdetails', element: user?.token ? <AdminAssignmentDetails /> : <Navigate to="/home" replace /> },
      { path: 'logout', element: user?.token ? <Logout/> : <Navigate to="/home" replace />},
      { path: 'newpassword', element: user?.token? <Password/> : <Navigate to="/home" replace />},
    ],
  },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Navigate to="/home" replace /> },
        { path: 'home', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : <Home /> },
        { path: 'login', element: user?.token && decoded.role === "user" ? <Navigate to="/dashboard/app" /> : user.role? <Login/> 
        :
        <Navigate to="/home" replace /> },
        { path: 'register', element: user?.token && decoded.role === "user"? <Navigate to="/dashboard/app" /> : <Register/> },
        { path: 'forget', element: user?.token && decoded.role === "user"? <Navigate to="/dashboard/app" /> : <Forget /> },
        { path: '/', element: user?.token && decoded.role === "admin" ? <Navigate to="/auth/admin" /> : <Home/> },
        { path: 'forget', element: user?.token && decoded.role === "admin"? <Navigate to="/auth/admin" /> : <Forget /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
