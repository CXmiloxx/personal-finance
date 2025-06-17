/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FiTrendingDown, FiAlertCircle, FiDollarSign } from 'react-icons/fi';

export default function ExpensesChart({ data = [] }) {
  const isMonthlyData = data && data[0] && 'month' in data[0];
  const isCategoryData = data && data[0] && 'name' in data[0];

  if (isMonthlyData) {
    const totalExpenses = data.reduce((sum, item) => sum + item.amount, 0);
    const averageExpenses = totalExpenses / data.length;
    const maxExpense = Math.max(...data.map(d => d.amount));
    const currentExpense = data[data.length - 1].amount;
    const trend = currentExpense < averageExpenses ? 'down' : 'up';

    return (
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Gastos Mensuales</h2>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'down' ? '↓' : '↑'} {Math.abs(((currentExpense - averageExpenses) / averageExpenses) * 100).toFixed(1)}%
            </span>
            <FiTrendingDown className={`w-5 h-5 ${trend === 'down' ? 'text-green-500' : 'text-red-500'}`} />
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#888' }}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                tick={{ fill: '#888' }}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString('es-ES')}`, 'Gasto']}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(22, 27, 34, 0.9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Bar
                dataKey="amount"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Total gastado</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">Media mensual</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {averageExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
            </p>
          </motion.div>
        </div>

        {currentExpense > averageExpenses && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-600 dark:text-red-400">
              Los gastos actuales están por encima del promedio mensual
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (isCategoryData) {
    const category = data[0];
    const spent = Number(category.spent) || 0;
    const averageExpense = Number(category.budget) || 0;
    const percentageOfAverage = averageExpense > 0 ? (spent / averageExpense) * 100 : 0;
    const isAboveAverage = spent > averageExpense;

    return (
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Categoría Principal</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Gastos más significativos</p>
          </div>
          <motion.div
            className={`p-3 rounded-full ${isAboveAverage ? 'bg-red-100 dark:bg-red-900/20' : 'bg-green-100 dark:bg-green-900/20'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDollarSign className={`w-6 h-6 ${isAboveAverage ? 'text-red-500' : 'text-green-500'}`} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Categoría</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {category.name || 'Sin nombre'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Gasto Total</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {spent.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
              </p>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 dark:text-gray-400">
                  Comparación con el promedio
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                  {Math.round(percentageOfAverage)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentageOfAverage, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isAboveAverage ? 'bg-red-500' : 'bg-green-500'
                  }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">Gasto Promedio</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {averageExpense.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">Diferencia</p>
              <p className={`text-xl font-semibold ${isAboveAverage ? 'text-red-500' : 'text-green-500'}`}>
                {isAboveAverage ? '+' : '-'}
                {Math.abs(spent - averageExpense).toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
              </p>
            </motion.div>
          </div>

          {isAboveAverage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <FiAlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">
                El gasto en esta categoría está por encima del promedio
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Gastos</h2>
      <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles o el formato no es compatible.</p>
    </div>
  );
}