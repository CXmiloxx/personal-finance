import React from 'react';
import CreateCategory from './components/CreateCategory';
import ButtonTheme from '@/ButtonTheme';
import useFetchCategories from '!/useFetchCategories';
import ListCategories from './components/ListCategories';

export default function CategorysPage() {
  const { categories, loading, error, createCategory } = useFetchCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <CreateCategory createCategory={createCategory} />
      <ListCategories categories={categories} loading={loading} error={error} />
    </div>
  );
}