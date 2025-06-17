/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiGrid, FiList } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useFetchCategories from '!/useFetchCategories';
import Modal from '@/ui/Modal';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryForm from './CategoryForm/CategoryForm';

export default function ListCategories() {
  const { categories, deleteCategory, editCategory, createCategory, error } = useFetchCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      reverseButtons: true,
      padding: '1.5rem',
      width: 'auto',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-lg font-semibold',
        content: 'text-gray-600 dark:text-gray-300',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg'
      }
    });

    if (result.isConfirmed) {
      await deleteCategory(categoryId);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      let success;
      if (editingCategory) {
        success = await editCategory(editingCategory.id, formData.name, formData.description);

        if (success) {
          setIsModalOpen(false);
          setEditingCategory(null);
        }
      } else {
        success = await createCategory(formData.name, formData.description);
        if (success) {
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Categorías
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Administra tus categorías de gastos e ingresos
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FiPlus className="w-5 h-5" />
              <span>Nueva Categoría</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
            }`}
        >
          <AnimatePresence>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay categorías
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Comienza creando tu primera categoría para organizar tus gastos e ingresos.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                <span>Crear Categoría</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <CategoryForm
          onSubmit={handleSubmit}
          initialData={editingCategory}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </Modal>
    </div>
  );
}
