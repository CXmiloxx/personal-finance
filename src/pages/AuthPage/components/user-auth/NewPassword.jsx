import { useAuth } from '#/AuthContext';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { newPassword, loading, error } = useAuth();
  const { idUser } = useParams();

  const handleChange = async (e) => {
    
    e.preventDefault();
    if (!password) {
      return Swal.fire({
        icon: 'warning',
        title: 'Contraseña requerida',
        text: 'Por favor ingresa tu nueva contraseña.',
        confirmButtonText: 'Aceptar',
      });
    }

    try {
      await newPassword(password, idUser);
      Swal.fire({
        icon: 'success',
        title: 'Contraseña Restablecida',
        text: 'Tu contraseña ha sido restablecida con éxito.',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo restablecer la contraseña.',
        confirmButtonText: 'Aceptar',
      });
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Nueva Contraseña
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          Ingresa tu nueva contraseña para continuar.
        </p>

        <form onSubmit={handleChange} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition duration-200 ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Cargando...' : 'Restablecer Contraseña'}
          </button>

          {error && (
            <div className="text-sm text-red-500 dark:text-red-400 text-center mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
