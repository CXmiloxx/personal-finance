import { FaWallet, FaChartPie, FaHome } from 'react-icons/fa';
import SignUp from '$/AuthPage/components/user-auth/SignUp';
import Login from '$/AuthPage/components/user-auth/Login';
import ResetPassword from '$/AuthPage/components/user-auth/ResetPassword';
import NewPassword from '$/AuthPage/components/user-auth/NewPassword';
import HomePage from '$/HomePage/HomePage';
import CategoriesPage from '$/categoriesPage/CategoriesPage';
import CategoryForm from '$/categoriesPage/components/CategoryForm/CategoryForm';
import TransactionsPage from '$/transactionsPage/TransactionsPage';

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
    component: ResetPassword,
  },
  {
    name: 'Nueva Contraseña',
    path: '/new-password/:token',
    component: NewPassword,
  },
];

export const protectedRoutes = [
  {
    name: 'Mis Transacciones',
    icon: FaWallet,
    path: '/transactions',
    component: TransactionsPage,
  },
  {
    name: 'Mis Categorías',
    path: '/categories',
    icon: FaChartPie,
    component: CategoriesPage,
  },
  {
    name: 'DashBoard',
    path: '/dashboard',
    icon: FaHome,
    component: HomePage,
  },
];

export const invisibleRoutes = [
  {
    name: 'Crear Categorías',
    path: '/create-categories',
    component: CategoryForm,
  },
];
