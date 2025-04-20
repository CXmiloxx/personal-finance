/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '#/ThemeContext';
import { useSidebarState } from '!/useSidebar';
import clsx from 'clsx';

export default function ButtonTheme() {
  const { theme, toggleTheme } = useTheme();
  const { isOpen } = useSidebarState();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      onClick={toggleTheme}
      className={clsx(
        'p-3 rounded-full flex items-center gap-4 shadow-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300',
        'hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
        {
          'w-full': isOpen
        }
      )}
    >
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FaSun size={24} className="text-yellow-500" />
        ) : (
          <FaMoon size={24} className="text-blue-500" />
        )}

        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium"
          >
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
}
