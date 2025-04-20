/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useSidebarState } from '!/useSidebar';
import clsx from 'clsx';

const NavigationItem = ({ item, onClick, isActive }) => {
  const { isOpen } = useSidebarState();

  return (
    <motion.button
      onClick={onClick}
      disabled={isActive}
      whileHover={!isActive ? { scale: 1.03 } : {}}
      whileTap={!isActive ? { scale: 0.97 } : {}}
      className={clsx(
        'group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden',
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md cursor-default dark:from-blue-700 dark:to-blue-800'
          : 'hover:bg-white/10 text-blue-500 dark:text-blue-300',
      )}
    >
      <motion.div
        className="text-xl flex-shrink-0"
        initial={{ rotate: 0 }}
        whileHover={!isActive ? { rotate: 5, scale: 1.1 } : {}}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {item.icon && <item.icon className="text-xl mr-2" />}
      </motion.div>

      {isOpen && (
        <div className="flex flex-col justify-center overflow-hidden">
          <motion.span
            className={clsx(
              'text-sm truncate',
              isActive
                ? 'font-semibold text-white'
                : 'text-gray-200 group-hover:font-medium',
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            {item.name}
          </motion.span>

          {item.description && (
            <motion.span
              className="text-xs text-gray-400 truncate"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {item.description}
            </motion.span>
          )}
        </div>
      )}
    </motion.button>
  );
};

export default NavigationItem;
