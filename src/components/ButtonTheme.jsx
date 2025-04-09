/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '#/ThemeContext';

export default function ButtonTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      onClick={toggleTheme}
      className="p-2 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
    >
      {theme === 'dark' ? <FaSun size={24} className="text-yellow-500" /> : <FaMoon size={24} className="text-blue-500" />}
    </motion.button>
  );
}
