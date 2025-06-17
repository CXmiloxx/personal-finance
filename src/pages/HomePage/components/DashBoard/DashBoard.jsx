/* eslint-disable no-unused-vars */
import useStatistics from '!/useStatistics';
import { motion, AnimatePresence } from 'framer-motion';
import BalanceCard from './BalanceCard';
import ExpensesChart from './ExpensesChart';
import IncomeChart from './IncomeChart';
import TransactionsList from './TransactionsList';
import { FiRefreshCw } from 'react-icons/fi';

export default function Dashboard() {
  const { statistics, loading, error, refetch } = useStatistics();

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-red-500 text-lg">Error al cargar los datos</div>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiRefreshCw className="w-5 h-5" />
          Reintentar
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard Financiero
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Resumen de tus finanzas personales
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key="overview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6"
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <BalanceCard
                balance={statistics.totals.balance}
                income={statistics.totals.income}
                expenses={statistics.totals.expense}
                netBalance={statistics.totals.balance}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <IncomeChart
                data={statistics.periodAverages.map(item => ({
                  month: item.period,
                  amount: parseFloat(item.average)
                }))}
                balance={statistics.totals.income}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <ExpensesChart
                data={[{
                  name: statistics.topCategory.name,
                  spent: parseFloat(statistics.topCategory.total),
                  budget: parseFloat(statistics.averageExpense)
                }]}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <TransactionsList transactions={statistics.recentTransactions} />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}