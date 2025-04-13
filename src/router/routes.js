import { FaHome, FaInfoCircle, FaConciergeBell, FaCog } from 'react-icons/fa';
import AboutPage from '$/AboutPage';
import ServicesPage from '$/ServicesPage';
import Option1Page from '$/Option1Page';
import CategorysPage from '$/CategoriesPage/CategorysPage';
import SignUp from '$/AuthPage/components/user-auth/SignUp';
import Login from '$/AuthPage/components/user-auth/Login';

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
    name: 'Inicio',
    path: '/categorias',
    icon: FaHome,
    component: CategorysPage,
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
