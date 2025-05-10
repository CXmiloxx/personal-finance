import { z } from 'zod';
import CustomForm from '@/ui/CustomForm';
import useFetchCategories from '!/useFetchCategories';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  categoryName: z.string().min(1, 'La descripción es obligatoria'),
});

const fields = [
  {
    name: 'categoryName',
    label: 'Nombre de la categoría',
    type: 'text',
    placeholder: 'Ej: Lujos',
  },
];
export default function CategoriesForm() {
  const { createCategory, error, loading } = useFetchCategories();
  const navigate = useNavigate();

  const handleSubmit = async ({ categoryName }) => {
    try {
      const response = await createCategory(categoryName);

      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La categoría se ha creado correctamente.',
          confirmButtonText: 'Aceptar',
        });
        navigate('/categories');
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo crear la categoría.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CustomForm
        schema={schema}
        onSubmit={handleSubmit}
        fields={fields}
        submitLabel="Guardar"
        title={'Crear Categoría'}
      />
      {loading && (
        <div className="mt-4">
          <p className="text-gray-500">Cargando...</p>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
