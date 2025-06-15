/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FiTrendingDown, FiAlertCircle } from 'react-icons/fi';

export default function ExpensesChart({ data }) {
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
        className=""
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
                tickFormatter={(value) => `€${value}`}
                tick={{ fill: '#888' }}
              />
              <Tooltip
                formatter={(value) => [`€${value.toLocaleString('es-ES')}`, 'Gasto']}
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
              {totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
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
              {averageExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
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
    const totalBudget = data.reduce((sum, category) => sum + category.budget, 0);
    const totalSpent = data.reduce((sum, category) => sum + category.spent, 0);
    const overspentCategories = data.filter(cat => cat.spent > cat.budget);

    return (
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-100">Gastos por Categoría</h2>

        <div className="space-y-4">
          {data.map((category, index) => (
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
                    ({((category.spent / totalSpent) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className={`h-2.5 rounded-full ${category.spent > category.budget ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  style={{ width: '0%' }}
                  animate={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Presupuesto: {category.budget.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                <span className="font-medium">
                  {Math.round((category.spent / category.budget) * 100)}% utilizado
                </span>
              </div>
            </motion.div>
          ))}
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
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                {overspentCategories.length} categoría{overspentCategories.length > 1 ? 's' : ''} excede{overspentCategories.length > 1 ? 'n' : ''} el presupuesto
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