/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function IncomeChart({ data }) {
  // Calculamos valores clave
  const totalIncome = data.reduce((sum, item) => sum + item.amount, 0);
  const averageIncome = totalIncome / data.length;
  const maxIncome = Math.max(...data.map(d => d.amount));
  const currentIncome = data[data.length - 1].amount;
  const trend = currentIncome > averageIncome ? 'up' : 'down';
  
  // Variantes para animaciones
  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (custom) => ({
      height: `${custom}%`,
      opacity: 1,
      transition: { 
        duration: 0.8,
        delay: custom * 0.005
      }
    })
  };
  
  return (
    <motion.div 
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-lg font-semibold mb-4 text-light-text  dark:text-dark-text"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Evolución de Ingresos
      </motion.h2>
      
      {/* Gráfico de área con Recharts */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke="#888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
              width={40}
            />
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="rgba(255,255,255,0.1)" 
            />
            <Tooltip 
              formatter={(value) => [`€${value.toLocaleString('es-ES')}`, 'Ingresos']}
              labelFormatter={(label) => `Mes: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              strokeWidth={2}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Gráfico de barras simplificado con animaciones */}
      <div className="h-24 flex items-end space-x-1 mt-2 mb-2">
        {data.map((item, index) => {
          const height = (item.amount / maxIncome) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <motion.div 
                className="w-full bg-gradient-to-t from-green-600 to-green-400 dark:from-green-700 dark:to-green-500 rounded-t group relative"
                custom={height}
                variants={barVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {item.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </div>
              </motion.div>
              <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">{item.month}</div>
            </div>
          );
        })}
      </div>
      
      <motion.div 
        className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Promedio mensual</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            {averageIncome.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total acumulado</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            {totalIncome.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        
        <div className="col-span-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tendencia</p>
          <div className="flex items-center">
            <p className={`text-lg font-semibold ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend === 'up' ? '↗ Ascendente' : '↘ Descendente'}
            </p>
            <motion.span 
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`ml-2 text-xl ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              {trend === 'up' ? '•' : '•'}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}