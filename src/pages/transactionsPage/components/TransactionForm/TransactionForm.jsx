/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle } from 'lucide-react';
import useFetchCategories from '!/useFetchCategories';

const transactionSchema = z.object({
  categoryId: z.string().min(1, 'La categoría es requerida'),
  amount: z.number().min(0.01, 'El monto debe ser mayor a 0'),
  movementType: z.enum(['income', 'expense'], {
    required_error: 'El tipo de movimiento es requerido',
  }),
  frequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly', 'yearly']),
  description: z.string().optional(),
});

export default function TransactionForm({ onSubmit, initialData, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories } = useFetchCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
      amount: initialData?.amount || '',
      movementType: initialData?.movementType || 'expense',
      frequency: initialData?.frequency || 'monthly',
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onCancel();
    } catch (error) {
      console.error('Error al guardar la transacción:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría
            </label>
            <select
              {...register('categoryId')}
              className={`w-full px-4 py-2 rounded-lg border ${errors.categoryId
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monto
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <input
                type="number"
                step="0.01"
                {...register('amount', { valueAsNumber: true })}
                className={`w-full pl-8 pr-4 py-2 rounded-lg border ${errors.amount
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Movimiento
            </label>
            <select
              {...register('movementType')}
              className={`w-full px-4 py-2 rounded-lg border ${errors.movementType
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
            {errors.movementType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.movementType.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Frecuencia
            </label>
            <select
              {...register('frequency')}
              className={`w-full px-4 py-2 rounded-lg border ${errors.frequency
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            >
              <option value="monthly">Mensual</option>
              <option value="weekly">Semanal</option>
              <option value="biweekly">Quincenal</option>
              <option value="daily">Diario</option>
              <option value="yearly">Anual</option>
            </select>
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.frequency.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción (opcional)
            </label>
            <textarea
              {...register('description')}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Describe la transacción..."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          Cancelar
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </motion.button>
      </div>
    </motion.form>
  );
} 