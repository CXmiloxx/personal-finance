/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BalanceCard from './BalanceCard';
import ExpensesChart from './ExpensesChart';
import IncomeChart from './IncomeChart';
import TransactionsList from './TransactionsList';
import BudgetProgress from './BudgetProgress';
import SavingsGoals from './SavingsGoals';

const mockData = {
  balance: 12450.75,
  income: 3200,
  expenses: 2150.5,
  transactions: [
    {
      id: 1,
      date: '2025-04-05',
      description: 'Salario',
      amount: 3200,
      type: 'income',
    },
    {
      id: 2,
      date: '2025-04-04',
      description: 'Supermercado',
      amount: -120.5,
      type: 'expense',
    },
    {
      id: 3,
      date: '2025-04-03',
      description: 'Restaurante',
      amount: -45.75,
      type: 'expense',
    },
    {
      id: 4,
      date: '2025-04-02',
      description: 'Transporte',
      amount: -35,
      type: 'expense',
    },
    {
      id: 5,
      date: '2025-04-01',
      description: 'Netflix',
      amount: -15.99,
      type: 'expense',
    },
  ],
  categories: [
    { name: 'Alimentación', spent: 450, budget: 600 },
    { name: 'Transporte', spent: 250, budget: 300 },
    { name: 'Ocio', spent: 220, budget: 200 },
    { name: 'Facturas', spent: 850, budget: 900 },
    { name: 'Otros', spent: 380.5, budget: 400 },
  ],
  savingsGoals: [
    { name: 'Vacaciones', current: 1200, target: 2000, deadline: '2025-07-01' },
    {
      name: 'Nuevo ordenador',
      current: 600,
      target: 1200,
      deadline: '2025-09-01',
    },
  ],
  expensesByMonth: [
    { month: 'Ene', amount: 2100 },
    { month: 'Feb', amount: 2250 },
    { month: 'Mar', amount: 2050 },
    { month: 'Abr', amount: 2150 },
  ],
  incomeByMonth: [
    { month: 'Ene', amount: 3100 },
    { month: 'Feb', amount: 3100 },
    { month: 'Mar', amount: 3200 },
    { month: 'Abr', amount: 3200 },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Dashboard() {
  const [data] = useState(mockData);

  return (
    <div className="">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center text-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard Financiero
      </motion.h1>
      
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <BalanceCard balance={data.balance} income={data.income} expenses={data.expenses} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300">
          <IncomeChart data={data.incomeByMonth} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-red-500 transition-all duration-300">
          <ExpensesChart data={data.expensesByMonth} />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
          <TransactionsList transactions={data.transactions} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300">
          <BudgetProgress categories={data.categories} />
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <motion.div variants={itemVariants} className="rounded-xl p-5 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
          <SavingsGoals goals={data.savingsGoals} />
        </motion.div>
      </motion.div>
    </div>
  );
}