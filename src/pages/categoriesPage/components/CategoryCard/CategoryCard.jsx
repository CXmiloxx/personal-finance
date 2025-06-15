/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function CategoryCard({ category, onEdit, onDelete }) {
  const progress = category.budget
    ? Math.min((category.spent / category.budget) * 100, 100)
    : 0;

  const getProgressColor = () => {
    if (!category.budget) return 'bg-gray-200 dark:bg-gray-700';
    if (category.spent > category.budget) return 'bg-red-500';
    if (category.spent > category.budget * 0.8) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {category.name}
          </h3>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(category)}
              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <FiEdit2 />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(category.id)}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FiTrash2 />
            </motion.button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Presupuesto asignado:</span>
            <span className="font-medium">
              {category.budget
                ? new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'COP'
                }).format(category.budget)
                : 'No asignado'}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Gastos actuales:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'COP'
              }).format(category.spent || 0)}
            </span>
          </div>
        </div>

        {category.budget && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-2 rounded-full ${getProgressColor()}`}
            />
          </div>
        )}

        {category.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {category.description}
          </p>
        )}
      </div>
    </motion.div>
  );
} 