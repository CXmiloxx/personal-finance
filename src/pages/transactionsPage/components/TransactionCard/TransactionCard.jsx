/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiArrowUp, FiArrowDown, FiCalendar, FiClock } from 'react-icons/fi';

export default function TransactionCard({ transaction, onEdit, onDelete, viewMode = 'grid' }) {
  const isIncome = transaction.movementType === 'income';
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(transaction.amount);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFrequency = (frequency) => {
    switch (frequency) {
      case 'deal':
        
        break;
    
      default:
        break;
    }
  };

  const cardContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            {isIncome ? (
              <FiArrowUp className={`w-5 h-5 ${isIncome ? 'text-green-500' : 'text-red-500'}`} />
            ) : (
              <FiArrowDown className={`w-5 h-5 ${isIncome ? 'text-green-500' : 'text-red-500'}`} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {transaction.description || 'Sin descripción'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {transaction.Category?.name || 'Sin categoría'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(transaction)}
            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <FiEdit2 />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(transaction.id)}
            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FiTrash2 />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiCalendar className="text-blue-500" />
            <span className="text-sm font-medium">Fecha</span>
          </div>
          <p className="text-sm text-gray-800 dark:text-white">
            {formatDate(transaction.date)}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FiClock className="text-green-500" />
            <span className="text-sm font-medium">Frecuencia</span>
          </div>
          <p className="text-sm text-gray-800 dark:text-white capitalize">
            {transaction.frequency}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${isIncome
          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
          {isIncome ? 'Ingreso' : 'Gasto'}
        </span>
        <span className={`text-lg font-semibold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
          {formattedAmount}
        </span>
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