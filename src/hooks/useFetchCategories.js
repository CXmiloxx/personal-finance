import { useAuth } from '#/AuthContext';
import { useEffect, useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_URL_API;

const useFetchCategories = () => {
  const { user } = useAuth();
  const idUser = user?.id || null;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    if (!idUser) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/categories/get/${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener categorías:', err);
    } finally {
      setLoading(false);
    }
  }, [idUser]);

  const createCategory = async (categoryName) => {
    if (!idUser) {
      setError('Usuario no autenticado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/categories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser, categoryName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la categoría');
      }

      // Actualizar la lista de categorías después de crear una nueva
      await fetchCategories();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error al crear categoría:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (categoryId, newCategoryName) => {
    if (!idUser) {
      setError('Usuario no autenticado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/categories/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId, name: newCategoryName}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al editar la categoría');
      }

      await fetchCategories();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error al editar categoría:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!idUser) {
      setError('Usuario no autenticado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/categories/delete/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser, categoryId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar la categoría');
      }

      await fetchCategories();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar categoría:', err);
      return false;
    } finally {
      setLoading(false);
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
