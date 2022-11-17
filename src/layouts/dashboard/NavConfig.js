// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;


export const navConfigUser = [
  {
    title: 'assignments',
    path: '/dashboard/user',
    icon: getIcon('bx:task'),
  },
  {
    title: 'profile',
    path: '/dashboard/accountsettings',
    icon: getIcon('bytesize:settings'),
  },
  {
    title: 'settings',
    path: '/dashboard/changepassword',
    icon: getIcon('ri:lock-password-line'),
  },
  {
    title: 'Logout',
    path: '/dashboard/logout',
    icon: getIcon('mdi-light:login')
   }
];


export const navConfigAdmin = [
  {
    title: 'assignments',
    path: '/dashboard/admin',
    icon: getIcon('bx:task'),
  },
  {
    title: 'profile',
    path: '/dashboard/accountsettings',
    icon: getIcon('bytesize:settings'),
  },
  {
    title: 'settings',
    path: '/dashboard/changepassword',
    icon: getIcon('ri:lock-password-line'),
  },
  {
    title: 'Add SubAdmin',
    path: '/dashboard/addsubadmin',
    icon: getIcon('subway:admin-1')
   },
   {
    title: 'Logout',
    path: '/dashboard/logout',
    icon: getIcon('mdi-light:login')
   }
];
export const navConfigSubAdmin = [
  {
    title: 'assignments',
    path: '/dashboard/admin',
    icon: getIcon('bx:task'),
  },
  {
    title: 'profile',
    path: '/dashboard/accountsettings',
    icon: getIcon('bytesize:settings'),
  },
  {
    title: 'settings',
    path: '/dashboard/changepassword',
    icon: getIcon('ri:lock-password-line'),
  },
  {
    title: 'Logout',
    path: '/dashboard/logout',
    icon: getIcon('mdi-light:login')
   }
];
