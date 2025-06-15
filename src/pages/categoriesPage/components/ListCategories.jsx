/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useFetchCategories from '!/useFetchCategories';
import Modal from '@/ui/Modal';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryForm from './CategoryForm/CategoryForm';

export default function ListCategories() {
  const { categories, deleteCategory, editCategory, createCategory, error } = useFetchCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      reverseButtons: true,
      padding: '1.5rem',
      width: 'auto',
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
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Categorías
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus />
          <span>Nueva Categoría</span>
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </motion.div>

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
