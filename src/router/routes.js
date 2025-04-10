import { FaHome, FaInfoCircle, FaConciergeBell, FaCog } from 'react-icons/fa';
import HomePage from '$/HomePage';
import AboutPage from '$/AboutPage';
import ServicesPage from '$/ServicesPage';
import Option1Page from '$/Option1Page';
import SignUp from '@/user-auth/SignUp';
import Login from '@/user-auth/Login';

export const publicRoutes = [
  {
    name: 'SingUp',
    path: '/',
    component: SignUp,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
];

export const protectedRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: FaHome,
    component: HomePage,
  },
  {
    name: 'Nosotros',
    path: '/about',
    icon: FaInfoCircle,
    component: AboutPage,
  },
  {
    name: 'Servicios',
    path: '/services',
    icon: FaConciergeBell,
    component: ServicesPage,
  },
  {
    name: 'Halloween 2022',
    path: '/halloween2022',
    icon: FaCog,
    component: Option1Page,
  },
];
