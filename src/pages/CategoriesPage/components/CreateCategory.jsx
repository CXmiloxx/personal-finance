/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader } from 'lucide-react';

export default function CreateCategory({ createCategory, onSuccess }) {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const handleChangeInput = (e) => {
    setCategoryName(e.target.value);
    // Limpia los mensajes de error al escribir
    if (validationMessage) setValidationMessage('');
    if (error) setError(null);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (categoryName.trim() === '') {
      setValidationMessage('El nombre de categoría no puede estar vacío');
      return;
    }
    
    setLoading(true);
    setError(null);
    setValidationMessage('');
    
    try {
      const success = await createCategory(categoryName);
      if (success) {
        setCategoryName('');
        if (onSuccess) onSuccess();
      } else {
        setValidationMessage('No se pudo crear la categoría');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {error && (
        <motion.div 
          className="text-red-600 dark:text-red-400 mb-4 p-3 bg-red-100 dark:bg-red-900/50 rounded-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {validationMessage && (
        <motion.div 
          className="text-amber-600 dark:text-amber-400 mb-4 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {validationMessage}
        </motion.div>
      )}

      <form onSubmit={handleCreateCategory}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre de la Categoría
          </label>
          <motion.input
            whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Nombre de la categoría"
            name="name"
            value={categoryName}
            onChange={handleChangeInput}
            disabled={loading}
            required
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              ${loading ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'} 
              text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
              flex items-center gap-2
            `}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>Creando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Guardar</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}