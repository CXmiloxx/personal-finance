import { useAuth } from '#/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import { useFetch } from './useFetch';

const useFetchCategories = () => {
  const { user } = useAuth();
  const idUser = user?.id || null;
  const { get, post, put, del, loading, error } = useFetch();

  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    if (!idUser) return;

    try {
      const data = await get(`/api/v1/categories`, {
        params: { userId: idUser },
      });

      if (data) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  }, [idUser, get]);

  const createCategory = async (name) => {
    if (!idUser) {
      return false;
    }

    try {
      const data = await post(`/api/v1/categories`, {
        body: { idUser, name },
      });

      if (data) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al crear categoría:', err);
      return false;
    }
  };

  const editCategory = async (categoryId, newCategoryName) => {
    if (!idUser) {
      return false;
    }

    try {
      const data = await put(`/api/v1/categories/${categoryId}`, {
        body: {
          id: categoryId,
          name: newCategoryName,
          userId: idUser,
        },
      });

      if (data) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al editar categoría:', err);
      return false;
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!idUser) {
      return false;
    }

    try {
      const data = await del(`/api/v1/categories/${categoryId}`, {
        body: { idUser, categoryId },
      });

      if (data) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      return false;
    }
  };

  useEffect(() => {
    if (idUser) {
      fetchCategories();
    }
  }, [idUser, fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    editCategory,
    deleteCategory,
  };
};

export default useFetchCategories;
