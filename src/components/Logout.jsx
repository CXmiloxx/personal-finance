/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Logout({ click }) {
  return (
    <motion.button
      onClick={click}
      className="p-2 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-900 
      dark:text-white transition-all duration-300
      hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FaSignOutAlt size={24} className="text-blue-500" />
    </motion.button>
  );
}
