import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function SelectType({ setType }) {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300";
  
  const gastoStyles = clsx(
    baseStyles,
    "bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-500 dark:hover:bg-pink-600"
  );
  const ingresoStyles = clsx(
    baseStyles,
    "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"
  );

  return (
    <div className="mt-6 flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setType('gasto')}
        className={gastoStyles}
      >
        Gasto
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setType('ingreso')}
        className={ingresoStyles}
      >
        Ingreso
      </motion.button>
    </div>
  );
}
