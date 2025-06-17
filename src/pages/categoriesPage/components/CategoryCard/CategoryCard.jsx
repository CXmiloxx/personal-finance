/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiDollarSign, FiCalendar, FiClock } from 'react-icons/fi';

export default function CategoryCard({ category, onEdit, onDelete, viewMode = 'grid' }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  const getProgressColor = (amount) => {
    if (amount == 0) return 'bg-gray-200 dark:bg-gray-700';
    if (amount < 0) return 'bg-red-500';
    if (amount > 0) return 'bg-green-500';
    return 'bg-green-500';
  };

  const cardContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.description}
            </p>
          )}
        </div>
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

      {/* Financial Summary Section */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiDollarSign className="text-blue-500" />
            <span className="text-sm font-medium">Total Transacciones</span>
          </div>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {formatCurrency(category.totalTransactions)}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiCalendar className="text-green-500" />
            <span className="text-sm font-medium">Creado</span>
          </div>
          <p className="text-sm text-gray-800 dark:text-white">
            {formatDate(category.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${category.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {category.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <FiClock className="text-sm" />
          <span className="text-xs">Actualizado: {formatDate(category.updatedAt)}</span>
        </div>
      </div>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300"
      >
        <div className="p-6">
          {cardContent}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      {cardContent}
    </motion.div>
  );
} 