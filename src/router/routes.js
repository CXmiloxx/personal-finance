import {
  FaDollarSign,
  FaList,
  FaPlusCircle,
  FaTachometerAlt,
} from 'react-icons/fa';
import SignUp from '$/AuthPage/components/user-auth/SignUp';
import Login from '$/AuthPage/components/user-auth/Login';
import ResetPassword from '$/AuthPage/components/user-auth/ResetPassword';
import NewPassword from '$/AuthPage/components/user-auth/NewPassword';
import HomePage from '$/HomePage/HomePage';
import expensesIncomePage from '$/expensesIncomePage/expensesIncomePage';
import CategoriesPage from '$/categoriesPage/CategoriesPage';
import CreateCategoriesPage from '$/createCategories/CreateCategoriesPage';

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
    name: 'Gastos y Ingresos',
    path: '/expenses-income',
    icon: FaDollarSign,
    component: expensesIncomePage,
  },
  {
    name: 'Mis Categorías',
    path: '/categories',
    icon: FaList,
    component: CategoriesPage,
  },
  {
    name: 'Crear Categorías',
    path: '/create-categories',
    icon: FaPlusCircle,
    component: CreateCategoriesPage,
  },
  {
    name: 'DashBoard',
    path: '/dashboard',
    icon: FaTachometerAlt,
    component: HomePage,
  },
];
