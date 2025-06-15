import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiCreditCard } from 'react-icons/fi';

export default function BalanceCard({ balance, income, expenses, netBalance }) {
  const isPositive = balance >= 0;
  const isSavingsGood = netBalance >= 20;
  const isExpensesHigh = expenses > income * 0.8;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Balance Total</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Estado actual de tus finanzas </p>
        </div>
        <motion.div
          className={`p-3 rounded-full ${isPositive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDollarSign className={`w-6 h-6 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        </motion.div>
      </div>

      <motion.div
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
          {balance.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="w-5 h-5 text-green-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
          </div>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {income.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingDown className="w-5 h-5 text-red-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Gastos</p>
          </div>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {expenses.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <FiCreditCard className={`w-5 h-5 ${isSavingsGood ? 'text-green-500' : 'text-yellow-500'}`} />
          <p className="text-sm text-gray-500 dark:text-gray-400">Saldo Actual</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
          {netBalance.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
          </p>
          <span className={`text-sm font-medium ${isSavingsGood ? 'text-green-500' :
            netBalance >= 10 ? 'text-yellow-500' : 'text-red-500'
            }`}>
            {isSavingsGood ? 'Excelente' :
              netBalance >= 10 ? 'Aceptable' : 'Necesita mejorar'}
          </span>
        </div>
      </motion.div>

      {isExpensesHigh && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-center gap-3"
        >
          <FiCreditCard className="w-5 h-5 text-yellow-500" />
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Tus gastos están cerca del 80% de tus ingresos. Considera reducir gastos para aumentar tu tasa de ahorro.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
