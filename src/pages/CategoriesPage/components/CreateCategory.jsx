import React, { useState } from 'react';

export default function CreateCategory({ createCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeInput = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    
    if (categoryName.trim() === '') return;
    
    setLoading(true);
    try {
      const success = await createCategory(categoryName);
      if (success) {
        setCategoryName('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:text-dark-text flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-bold mb-6">Crear Categoría</h1>

      {loading && (
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          Creando categoría...
        </div>
      )}

      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4 p-3 bg-red-100 dark:bg-red-900/50 rounded-md">
          {error}
        </div>
      )}

      <form
        onSubmit={handleCreateCategory}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre de la Categoría
          </label>
          <input
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

        <div className="flex items-center justify-between">
          <button
            className={`
              ${loading ? 'bg-blue-300 dark:bg-blue-800 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'} 
              text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            `}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}