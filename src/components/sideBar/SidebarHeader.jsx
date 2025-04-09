/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import logo from '/logo.webp';

const SidebarHeader = ({ sideOpen, setSideOpen }) => {
  return (
    <motion.div
      className="flex items-center justify-between p-2 border-b border-gray-700"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={logo}
        className="h-10 w-10 "
        alt="Logo" 
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      />
      
      <motion.button
        onClick={() => setSideOpen(!sideOpen)}
        className="dark:text-white focus:outline-none hover:text-blue-400 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: sideOpen ? 90 : 270 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default SidebarHeader;