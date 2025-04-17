import { useAuth } from '#/AuthContext';
import React from 'react';
import Swal from 'sweetalert2';

export default function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const { resetPassword, error, loading, } = useAuth(); // ← Ya estamos usando loading y error

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChange = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo requerido',
        text: 'Por favor ingresa tu correo electrónico.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    try {
      await resetPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Correo Enviado',
        text: 'Revisa tu correo para restablecer tu contraseña.',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo enviar el correo de restablecimiento.',
        confirmButtonText: 'Aceptar',
      });
      console.log(error);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden max-w-md w-full flex flex-col p-10">
        <h2 className="text-3xl font-bold text-center mb-6">Restablecer Contraseña</h2>
        <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </p>

        <form className="space-y-4" onSubmit={handleChange}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              placeholder="Correo Electrónico"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar Correo de Restablecimiento'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
