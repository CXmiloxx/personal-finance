import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiAward, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function SavingsGoals({ goals }) {
  const completedGoals = goals.filter(goal => goal.current >= goal.target);
  const inProgressGoals = goals.filter(goal => goal.current < goal.target);
  const totalProgress = goals.reduce((sum, goal) => sum + (goal.current / goal.target), 0) / goals.length * 100;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Metas de Ahorro</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Progreso: {Math.round(totalProgress)}%</p>
        </div>
        <motion.div
          className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiTarget className="w-5 h-5 text-blue-500" />
        </motion.div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {inProgressGoals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const isNearTarget = progress >= 80;

          return (
            <motion.div
              key={goal.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate">
                    {goal.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {goal.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {goal.current.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    de {goal.target.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                <motion.div
                  className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' :
                    isNearTarget ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                  style={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}% completado
                </span>
                {isNearTarget && (
                  <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3" />
                    ¡Cerca!
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {completedGoals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xs font-medium text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-1">
              <FiAward className="w-4 h-4 text-green-500" />
              Completadas
            </h3>
            <div className="space-y-2">
              {completedGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate">
                          {goal.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(goal.completedDate).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-green-500 flex-shrink-0">
                      {goal.target.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No hay metas configuradas
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}