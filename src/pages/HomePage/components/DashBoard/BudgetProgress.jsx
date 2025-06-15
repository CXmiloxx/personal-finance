import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export default function BudgetProgress({ categories = [] }) {
  const totalBudget = categories.reduce((sum, cat) => sum + (cat.budget || 0), 0);
  const totalSpent = categories.reduce((sum, cat) => sum + (cat.spent || 0), 0);
  const overspentCategories = categories.filter(cat => (cat.spent || 0) > (cat.budget || 0));
  const warningCategories = categories.filter(cat => (cat.spent || 0) > (cat.budget || 0) * 0.8 && (cat.spent || 0) <= (cat.budget || 0));
  const safeCategories = categories.filter(cat => (cat.spent || 0) <= (cat.budget || 0) * 0.8);

  if (!categories || categories.length === 0) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Progreso del Presupuesto</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400">No hay categorías disponibles</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Progreso del Presupuesto</h2>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${totalSpent > totalBudget ? 'text-red-500' :
            totalSpent > totalBudget * 0.8 ? 'text-yellow-500' : 'text-green-500'
            }`}>
            {Math.round((totalSpent / totalBudget) * 100)}% utilizado
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const status = percentage > 100 ? 'danger' : percentage > 80 ? 'warning' : 'safe';

          return (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {category.spent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    de {category.budget.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className={`h-2.5 rounded-full ${status === 'danger' ? 'bg-red-500' :
                    status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  style={{ width: '0%' }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{Math.round(percentage)}% utilizado</span>
                <span className="font-medium">
                  {status === 'danger' ? 'Excede presupuesto' :
                    status === 'warning' ? 'Cerca del límite' : 'Dentro del presupuesto'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total gastado</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {totalSpent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Presupuesto total</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {totalBudget.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
        </div>

        {overspentCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-600 dark:text-red-400">
              {overspentCategories.length} categoría{overspentCategories.length > 1 ? 's' : ''} excede{overspentCategories.length > 1 ? 'n' : ''} el presupuesto
            </p>
          </motion.div>
        )}

        {warningCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-center gap-3"
          >
            <FiInfo className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              {warningCategories.length} categoría{warningCategories.length > 1 ? 's' : ''} está{warningCategories.length > 1 ? 'n' : ''} cerca del límite
            </p>
          </motion.div>
        )}

        {safeCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3"
          >
            <FiCheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-green-600 dark:text-green-400">
              {safeCategories.length} categoría{safeCategories.length > 1 ? 's' : ''} está{safeCategories.length > 1 ? 'n' : ''} dentro del presupuesto
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}