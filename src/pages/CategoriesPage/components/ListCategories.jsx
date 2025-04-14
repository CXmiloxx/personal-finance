import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  DollarSign,
  Home,
  Wind,
  Fuel,
  Globe,
  Diamond,
  Car,
  Bus,
  Phone,
  FileText,
} from 'lucide-react';

const categoryIcons = {
  Ahorro: <DollarSign size={28} />,
  Arriendo: <Home size={28} />,
  Aseo: <Wind size={28} />,
  Gasolina: <Fuel size={28} />,
  Internet: <Globe size={28} />,
  Lujos: <Diamond size={28} />,
  Parqueadero: <Car size={28} />,
  Pasajes: <Bus size={28} />,
  Teléfono: <Phone size={28} />,
};

const getCategoryIcon = (categoryName) => {
  const normalizedName = categoryName.toLowerCase();

  for (const [key, value] of Object.entries(categoryIcons)) {
    if (normalizedName.includes(key.toLowerCase())) {
      return value;
    }
  }

  return <FileText size={28} />;
};

const getBackgroundColor = (categoryId) => {
  const colors = [
    'bg-amber-700',
    'bg-stone-600',
    'bg-emerald-600',
    'bg-red-700',
    'bg-slate-500',
    'bg-blue-600',
    'bg-blue-800',
    'bg-amber-600',
    'bg-slate-700',
    'bg-purple-600',
    'bg-rose-600',
    'bg-teal-600',
  ];

  const index = parseInt(categoryId) % colors.length;
  return colors[index];
};

export default function ListCategories({
  categories,
  loading,
  error,
  onAddCategory,
  onEditCategory
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900/50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 12 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  return (
    <div className="bg-transparent p-2">
      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {categories &&
            categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                onClick={() => onEditCategory(category)} // 👈
                whileHover="hover"
                exit={{
                  opacity: 0,
                  scale: 0.6,
                  transition: { duration: 0.3 },
                }}
                className={`${getBackgroundColor(
                  category.id,
                )} rounded-2xl flex flex-col items-center justify-center p-3 shadow-lg aspect-square`}
              >
                <div className="text-white mb-2">
                  {getCategoryIcon(category.name)}
                </div>
                <span className="text-white text-center font-medium text-sm">
                  {category.name}
                </span>
              </motion.div>
            ))}

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              borderColor: '#3b82f6',
              transition: { type: 'spring', stiffness: 400, damping: 10 },
            }}
            className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center p-3 aspect-square cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            onClick={onAddCategory}
          >
            <div className="mb-2 text-gray-400 dark:text-gray-500">
              <Plus size={24} />
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-center font-medium text-sm">
              Añadir categoría
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
