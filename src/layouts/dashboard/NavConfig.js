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
    title: 'settings',
    path: '/dashboard/accountsettings',
    icon: getIcon('bytesize:settings'),
  },
  {
    title: 'change password',
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
    title: 'settings',
    path: '/dashboard/accountsettings',
    icon: getIcon('bytesize:settings'),
  },
  {
    title: 'change password',
    path: '/dashboard/changepassword',
    icon: getIcon('ri:lock-password-line'),
  },
  {
    title: 'Logout',
    path: '/dashboard/logout',
    icon: getIcon('mdi-light:login')
   }
];
