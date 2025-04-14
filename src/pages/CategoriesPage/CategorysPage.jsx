/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonTheme from '@/ButtonTheme';
import useFetchCategories from '!/useFetchCategories';
import ListCategories from './components/ListCategories';
import Modal from '@/Modal';
import CreateCategory from './components/CreateCategory';
import EditOrDeleteCategory from './components/EditOrDeleteCategory';

export default function CategorysPage() {
  const {
    categories,
    loading,
    error,
    createCategory,
    editCategory,
    deleteCategory,
  } = useFetchCategories();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setShowEditModal(false);
  };

  const handleAddCategory = () => {
    setShowCreateModal(true);
  };

  const handleEditCategory = async (categoryId, newCategoryName) => {
    const categoryExists = categories.some(
      (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase(),
    );

    if (categoryExists) {
      throw new Error('Esta categoría ya existe');
    }

    return await editCategory(categoryId, newCategoryName);
  };

  const handleDeleteCategory = async (categoryId) => {
    const categoryExists = categories.some((cat) => cat.id === categoryId);

    if (!categoryExists) {
      throw new Error('Esta categoría no existe');
    }

    return await deleteCategory(categoryId);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateCategory = async (categoryName) => {
    const categoryExists = categories.some(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (categoryExists) {
      throw new Error('Esta categoría ya existe');
    }

    return await createCategory(categoryName);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Mis Categorías
        </h1>
        <ButtonTheme />
      </div>
      <ListCategories
        categories={categories}
        loading={loading}
        error={error}
        onAddCategory={handleAddCategory}
        onEditCategory={handleOpenEditModal}
      />

      <AnimatePresence>
        {showCreateModal && (
          <Modal handleCloseModal={handleCloseModal}>
            <CreateCategory
              createCategory={handleCreateCategory}
              onSuccess={handleCloseModal}
            />
          </Modal>
        )}

        {showEditModal && selectedCategory && (
          <Modal handleCloseModal={handleCloseEditModal}>
            <EditOrDeleteCategory
              category={selectedCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              onClose={handleCloseEditModal}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
