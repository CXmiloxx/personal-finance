import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditOrDeleteCategory({ category, onEdit, onDelete, onClose }) {
  const [newName, setNewName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');  // Para mostrar el mensaje de error o éxito
  const [messageType, setMessageType] = useState('');  // Para controlar el estilo del mensaje

  const handleEdit = async () => {
    try {
      setLoading(true);
      await onEdit(category.id, newName);
      setMessageType('success');
      setMessage('La categoría fue actualizada con éxito');
      onClose();
    } catch (error) {
      setMessageType('error');
      setMessage(error.message || 'No se pudo actualizar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'bg-gray-800 text-white',  // Fondo oscuro y texto blanco
        title: 'text-2xl font-bold',       // Título más grande y negrita
        cancelButton: 'bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded',  // Estilo para el botón de cancelar
        confirmButton: 'bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded',   // Estilo para el botón de confirmar
      },
      buttonsStyling: false, // Para evitar que los botones tengan el estilo predeterminado
    });

    if (confirm.isConfirmed) {
      try {
        setLoading(true);
        await onDelete(category.id);
        setMessageType('success');
        setMessage('La categoría fue eliminada con éxito');
        onClose();
      } catch (error) {
        setMessageType('error');
        setMessage(error.message || 'No se pudo eliminar la categoría');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Editar Categoría</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:text-white"
        disabled={loading}
      />
      
      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div className={`p-2 my-2 rounded ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {message}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleEdit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
