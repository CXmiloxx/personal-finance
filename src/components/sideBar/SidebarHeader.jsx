/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '#/AuthContext';
import logo from '/logo.png';
import logoDark from '/logo-dark.png';
import { useTheme } from '#/ThemeContext';
import { useSidebarState } from '!/useSidebar';

const SidebarHeader = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const {isOpen, setIsOpen } = useSidebarState();

  return (
    <motion.div
      className="flex flex-col border-b border-gray-200 dark:border-gray-700 p-4"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div className="flex items-center gap-3">
          <motion.img
            src={theme === 'dark' ? logo : logoDark}
            className="h-8 w-8"
            alt="Logo"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
          {isOpen && (
            <motion.h1
              className="text-lg font-semibold text-gray-800 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Mis Finanzas
            </motion.h1>
          )}
        </motion.div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronLeft />
          </motion.div>
        </motion.button>
      </div>

      {isOpen && user && (
        <motion.div
          className="flex items-center gap-3 px-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {user.name || 'Usuario'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.email || 'correo@ejemplo.com'}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SidebarHeader;
