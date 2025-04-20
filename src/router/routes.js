import { FaHome, FaInfoCircle, FaConciergeBell, FaCog } from 'react-icons/fa';
import AboutPage from '$/AboutPage';
import ServicesPage from '$/ServicesPage';
import CategorysPage from '$/CategoriesPage/CategorysPage';
import SignUp from '$/AuthPage/components/user-auth/SignUp';
import Login from '$/AuthPage/components/user-auth/Login';
import ResetPassword from '$/AuthPage/components/user-auth/ResetPassword';
import NewPassword from '$/AuthPage/components/user-auth/NewPassword';
import HomePage from '$/HomePage/HomePage';

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
  {
    name: 'Reset Password',
    path: '/reset-password',
    component: ResetPassword ,
  },
  {
    name: 'Nueva Contraseña',
    path: '/new-password/:token',
    component: NewPassword,
  }
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
    name: 'DashBoard',
    path: '/dashboard',
    icon: FaCog,
    component: HomePage,
  },
];
