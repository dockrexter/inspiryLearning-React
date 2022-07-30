// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'assignments',
    path: '/dashboard/app',
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
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
