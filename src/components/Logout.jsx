/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSidebarState } from '!/useSidebar';
import clsx from 'clsx';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen } = useSidebarState();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.button
      onClick={handleLogout}
      className={clsx(
        'p-3 rounded-lg flex items-center gap-4 shadow-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300',
        'hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
        {
          'w-full': isOpen,
        }
      )}
      whileHover={{ scale: 1.05, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FaSignOutAlt size={24} className="text-blue-500" />
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium"
          >
            Cerrar sesión
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
}
