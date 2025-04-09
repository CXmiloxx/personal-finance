import { FaHome, FaInfoCircle, FaConciergeBell, FaCog } from 'react-icons/fa';
import LoginPage from '@/LoginPage';
import HomePage from '$/HomePage/HomePage';
import AboutPage from '$/AboutPage';
import ServicesPage from '$/ServicesPage';
import Option1Page from '$/Option1Page';

export const publicRoutes = [
  {
    name: 'Login',
    path: '/',
    component: LoginPage,
  }
];

export const protectedRoutes = [
  {
    name: 'Dashboard',
    path: '/Dashboard',
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
  }
];
