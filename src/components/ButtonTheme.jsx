/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '#/ThemeContext';
import { useSidebarState } from '!/useSidebar';

export default function ButtonTheme() {
  const { theme, toggleTheme } = useTheme();
  const { isOpen } = useSidebarState();

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      onClick={toggleTheme}
      className="p-2 rounded-full flex items-center gap-2 shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
    >
      {/* Icono */}
      {theme === 'dark' ? (
        <FaSun size={24} className="text-yellow-500" />
      ) : (
        <FaMoon size={24} className="text-blue-500" />
      )}

      {/* Texto adicional cuando isOpen es true */}
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
    </motion.button>
  );
}
