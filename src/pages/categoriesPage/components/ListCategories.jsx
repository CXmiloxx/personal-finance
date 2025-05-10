import useFetchCategories from '!/useFetchCategories';
import { motion } from 'framer-motion';
import { getIconByCategoryName } from 'helpers/getIconByCategoryName';
import Swal from 'sweetalert2';
import { PencilLine, Trash2, Loader2, AlertTriangle } from 'lucide-react';

export default function ListCategories() {
  const { categories, deleteCategory, editCategory, error, loading } =
    useFetchCategories();

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(categoryId);
        Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
      }
    }
  };

  const handleEdit = async (categoryId, currentName) => {
    const { value: newName } = await Swal.fire({
      title: 'Editar categoría',
      input: 'text',
      inputLabel: 'Nuevo nombre de la categoría',
      inputValue: currentName,
      inputPlaceholder: 'Escribe el nuevo nombre',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    });

    if (newName !== undefined) {
      if (newName.trim() === '') {
        Swal.fire('Advertencia', 'El nombre no puede estar vacío.', 'warning');
        return;
      }

      if (newName === currentName) {
        Swal.fire(
          'Sin cambios',
          'El nombre ingresado es igual al actual.',
          'info',
        );
        return;
      }

      try {
        const response = await editCategory(categoryId, newName);
        if (response) {
          Swal.fire('Éxito', 'La categoría ha sido editada.', 'success');
        } else {
          Swal.fire('Error', 'No se pudo editar la categoría.', 'error');
        }
      } catch (error) {
        console.error('Error al editar la categoría:', error);
        const backendMessage =
          error?.response?.data?.error || 'No se pudo editar la categoría.';
        Swal.fire('Error', backendMessage, 'error');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-dark-text">
        Mis Categorías
      </h1>

      {loading ? (
        <div className="flex justify-center my-10">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 justify-center text-red-600 dark:text-red-400 mb-6">
          <AlertTriangle className="w-5 h-5" />
          <span>Error al cargar las categorías</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = getIconByCategoryName(category.name);
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-dark-bg dark:text-dark-text shadow-lg hover:shadow-xl rounded-xl p-5 flex flex-col items-center transition-all relative"
              >
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-center mb-3">
                  {category.name}
                </h2>

                <div className="flex gap-4 absolute top-3 right-3">
                  <button
                    onClick={() => handleEdit(category.id, category.name)}
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                    title="Editar"
                  >
                    <PencilLine className="w-5 h-5 text-blue-600 dark:text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 rounded-full bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 transition"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-white" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
