/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { useSidebarState } from '!/useSidebar';

const NavigationItem = ({ item, onClick, isActive }) => {
  const { isOpen } = useSidebarState();
  return (
    <motion.button
      onClick={onClick}
      disabled={isActive}
      className={`relative group flex items-center w-full rounded-xl p-2.5
        transition-all duration-300 ease-in-out overflow-hidden
        ${
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg cursor-default dark:from-blue-700 dark:to-blue-800'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
        }
      `}
      whileHover={!isActive ? { scale: 1.02, x: 4 } : {}}
      whileTap={!isActive ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center gap-3 flex-1">
        <motion.div
          className={`${isOpen ? 'text-xl' : 'text-xl'} ${
            isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'
          }`}
          initial={{ rotate: 0 }}
          whileHover={!isActive ? { rotate: 8, scale: 1.1 } : {}}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {React.createElement(item.icon)}
        </motion.div>

        {isOpen && (
          <div className="flex flex-col items-start">
            <motion.span
              className={`whitespace-nowrap text-sm transition-all duration-200 ease-in-out ${
                isActive ? 'font-semibold' : 'group-hover:font-medium'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {item.name}
            </motion.span>
            {item.description && (
              <motion.span
                className="text-xs text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {item.description}
              </motion.span>
            )}
          </div>
        )}
      </div>

      {isOpen && !isActive && (
        <motion.div
          className="text-gray-400 dark:text-gray-500"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaChevronRight size={12} />
        </motion.div>
      )}

      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-300 dark:bg-blue-400"
          layoutId="activeIndicator"
        />
      )}
    </motion.button>
  );
};

export default NavigationItem;
