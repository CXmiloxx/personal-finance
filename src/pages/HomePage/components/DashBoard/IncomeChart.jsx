/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

export default function IncomeChart({ data, balance }) {
  const totalIncome = balance;
  const averageIncome = totalIncome / data.length;
  const currentIncome = data[data.length - 1].amount;
  const trend = currentIncome > averageIncome ? 'up' : 'down';
  const growthRate = ((currentIncome - data[0].amount) / data[0].amount) * 100;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ingresos Mensuales</h2>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↑' : '↓'} {Math.abs(((currentIncome - averageIncome) / averageIncome) * 100).toFixed(1)}%
          </span>
          <FiTrendingUp className={`w-5 h-5 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
              formatter={(value) => [`€${value.toLocaleString('es-ES')}`, 'Ingreso']}
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
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorIncome)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Total ingresos</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {totalIncome.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
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
            {averageIncome.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Tasa de crecimiento</p>
          <p className={`text-xl font-semibold ${growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Último ingreso</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {currentIncome.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </motion.div>
      </div>

      {currentIncome < averageIncome && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-3"
        >
          <FiAlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">
            Los ingresos actuales están por debajo del promedio mensual
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}