import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownLeft, FiFilter, FiSearch, FiX } from 'react-icons/fi';

export default function TransactionsList({ transactions = [] }) {
  console.log(transactions);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' ||
        (filterType === 'income' && transaction.amount > 0) ||
        (filterType === 'expense' && transaction.amount < 0);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return Math.abs(b.amount) - Math.abs(a.amount);
      return 0;
    });

  const getTransactionIcon = (movementType) => {
    return movementType == 'income' ? (
      <FiArrowUpRight className="w-4 h-4 text-green-500" />
    ) : (
      <FiArrowDownLeft className="w-4 h-4 text-red-500" />
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Transacciones Recientes</h2>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${filterType === 'all'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            onClick={() => setFilterType('all')}
          >
            Todas
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${filterType === 'income'
              ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            onClick={() => setFilterType('income')}
          >
            Ingresos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 rounded-full text-xs font-medium ${filterType === 'expense'
              ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            onClick={() => setFilterType('expense')}
          >
            Gastos
          </motion.button>
        </div>
      </div>

      <div className="relative mb-4">
        <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-4 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex justify-end mb-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-2 py-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Fecha</option>
          <option value="amount">Monto</option>
        </select>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${transaction.amount > 0
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                    {getTransactionIcon(transaction.movementType)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate">
                      {transaction.description || 'Sin descripción'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {transaction.category} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold text-sm ${transaction.movementType == 'income'
                    ? 'text-green-500'
                    : 'text-red-500'
                    }`}>
                    {transaction.movementType == 'income' ? '+' : '-'}
                    {transaction.amount.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No se encontraron transacciones
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}