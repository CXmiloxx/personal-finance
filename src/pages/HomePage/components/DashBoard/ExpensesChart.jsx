/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpensesChart({ data }) {
  const isMonthlyData = data && data[0] && 'month' in data[0];
  const isCategoryData = data && data[0] && 'name' in data[0];
  
  if (isMonthlyData) {
    return (
      <motion.div 
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Gastos Mensuales</h2>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip 
                formatter={(value) => [`€${value}`, 'Gasto']}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total gastado:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {data.reduce((sum, item) => sum + item.amount, 0)
                .toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Media mensual:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {(data.reduce((sum, item) => sum + item.amount, 0) / data.length)
                .toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Si los datos son por categoría (como se esperaba originalmente)
  if (isCategoryData) {
    const totalBudget = data.reduce((sum, category) => sum + category.budget, 0);
    const totalSpent = data.reduce((sum, category) => sum + category.spent, 0);

    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 p-4 rounded-lg d"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Gastos por Categoría</h2>
        
        <div className="space-y-3">
          {data.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {category.spent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                  <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">
                    ({((category.spent / totalSpent) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  className={`h-2.5 rounded-full ${
                    category.spent > category.budget ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: '0%' }}
                  animate={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                ></motion.div>
              </div>
              <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400 mt-1">
                {Math.round((category.spent / category.budget) * 100)}% del presupuesto
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total gastado:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {totalSpent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Presupuesto total:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {totalBudget.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Balance:</span>
            <span className={`font-semibold ${
              totalBudget - totalSpent >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {(totalBudget - totalSpent).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
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