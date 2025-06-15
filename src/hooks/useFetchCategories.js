import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '#/AuthContext';
import { useFetch } from './useFetch';
import { CustomAlert } from '@/ui/CustomAlert';

export default function useFetchCategories() {
  const { get, post, put, del, error: fetchError } = useFetch();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Memoize user ID to prevent unnecessary re-renders
  const idUser = useMemo(() => user?.id, [user?.id]);

  // Memoize fetchCategories function
  const fetchCategories = useCallback(async () => {
    if (!idUser) return;

    try {
      const data = await get(`/api/v1/categories`, {
        params: { userId: idUser },
      });

      if (data?.categories) {
        setCategories(data.categories);
        setError(null);
      }
    } catch (err) {
      console.error('Error al obtener categorías:', err);
      setError(err.message);
      CustomAlert.error('Error', 'No se pudieron cargar las categorías');
    }
  }, [idUser, get]);

  // Memoize createCategory function
  const createCategory = useCallback(
    async (name, description) => {
      if (!idUser) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await post(`/api/v1/categories`, {
          body: { idUser, name, description },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success('¡Éxito!', 'Categoría creada correctamente');
        }

        await fetchCategories();
        return true;
      } catch (err) {
        const errorMessage = err.message || 'No se pudo crear la categoría';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al crear categoría:', err);
        setError(errorMessage);
        return false;
      }
    },
    [idUser, post, fetchCategories],
  );

  // Memoize editCategory function
  const editCategory = useCallback(
    async (categoryId, name, description) => {
      if (!idUser) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await put(`/api/v1/categories/${categoryId}`, {
          body: { idUser, name, description },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success('¡Éxito!', 'Categoría actualizada correctamente');
        }

        await fetchCategories();
        return true;
      } catch (err) {
        const errorMessage =
          err.message || 'No se pudo actualizar la categoría';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al actualizar categoría:', err);
        setError(errorMessage);
        return false;
      }
    },
    [idUser, put, fetchCategories],
  );

  // Memoize deleteCategory function
  const deleteCategory = useCallback(
    async (categoryId) => {
      if (!idUser) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await del(`/api/v1/categories/${categoryId}`, {
          body: { idUser, categoryId },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success('¡Éxito!', 'Categoría eliminada correctamente');
        }

        await fetchCategories();
        return true;
      } catch (err) {
        const errorMessage = err.message || 'No se pudo eliminar la categoría';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al eliminar categoría:', err);
        setError(errorMessage);
        return false;
      }
    },
    [idUser, del, fetchCategories],
  );

  // Fetch categories on mount and when idUser changes
  useEffect(() => {
    if (idUser) {
      fetchCategories();
    }
  }, [idUser, fetchCategories]);

  // Memoize the return object to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      categories,
      error: error || fetchError,
      createCategory,
      editCategory,
      deleteCategory,
      fetchCategories,
    }),
    [
      categories,
      error,
      fetchError,
      createCategory,
      editCategory,
      deleteCategory,
      fetchCategories,
    ],
  );

  return returnValue;
}
