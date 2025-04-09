/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Logout({ click }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      onClick={click}
      className="p-2 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
    >
      <FaSignOutAlt size={24} className="text-blue-500" />
    </motion.button>
  );
}
