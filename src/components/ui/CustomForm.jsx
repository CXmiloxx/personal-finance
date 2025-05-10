import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function CustomForm({
  title,
  schema,
  onSubmit,
  fields,
  defaultValues = {},
  submitLabel = 'Enviar',
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl w-full max-w-2xl border dark:border-gray-800 space-y-6"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 relative inline-block">
          {title}
          <span className="block h-1 w-14 bg-indigo-600 mt-2 rounded"></span>
        </h2>
      </div>

      {fields.map(({ name, label, type = 'text', placeholder, options }) => (
        <div key={name} className="space-y-1">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {type === 'text' && (
            <input
              type={type}
              placeholder={placeholder}
              {...register(name)}
              className={`w-full px-4 py-3 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                errors[name]
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          )}
          {type === 'select' && options && (
            <select
              {...register(name)}
              className={`w-full px-4 py-3 rounded-xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                errors[name]
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          {type === 'checkbox' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register(name)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </div>
          )}
          {errors[name] && (
            <p className="flex items-center text-sm text-red-600 mt-1">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors[name].message}
            </p>
          )}
        </div>
      ))}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-md"
      >
        {submitLabel}
      </motion.button>
    </motion.form>
  );
}
