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
  date: z.string().min(1, 'La fecha es requerida'),
  description: z.string().min(1, 'La descripción es requerida'),
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
      movementType: initialData?.movementType || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
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
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className={`w-full px-4 py-2 rounded-lg border ${errors.amount
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            placeholder="0.00"
          />
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
            <option value="">Selecciona un tipo</option>
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
          {errors.movementType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.movementType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha
          </label>
          <input
            type="date"
            {...register('date')}
            className={`w-full px-4 py-2 rounded-lg border ${errors.date
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.date.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            {...register('description')}
            rows="3"
            className={`w-full px-4 py-2 rounded-lg border ${errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            placeholder="Describe la transacción..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
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