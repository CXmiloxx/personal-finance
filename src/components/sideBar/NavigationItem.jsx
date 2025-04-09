/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const NavigationItem = ({ item, onClick, isOpen, isActive }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isActive}
      className={`
        group flex items-center gap-3 p-3 w-full rounded-xl
        transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-blue-800 bg-opacity-50 text-white border-l-4 border-blue-500 cursor-default' 
          : 'hover:bg-light-hover-bg dark:hover:bg-dark-hover-bg text-gray-700 dark:text-gray-200'}
      `}
      whileHover={!isActive ? { scale: 1.03 } : {}}
      whileTap={!isActive ? { scale: 0.97 } : {}}
    >
      <motion.div
        className={isOpen ? 'text-xl' : 'mx-auto text-xl'}
        initial={{ rotate: 0 }}
        whileHover={!isActive ? { rotate: 5 } : {}}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {React.createElement(item.icon)}
      </motion.div>

      {isOpen && (
        <motion.span
          className={`whitespace-nowrap overflow-hidden text-sm transition-all duration-200 ease-in-out ${
            isActive ? 'font-semibold' : 'group-hover:font-medium'
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          {item.name}
        </motion.span>
      )}
    </motion.button>
  );
};

export default NavigationItem;
