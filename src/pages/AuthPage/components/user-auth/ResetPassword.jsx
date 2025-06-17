/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

export default function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const { resetPassword, error, loading } = useAuth();
  const navigate = useNavigate();

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

      setEmail('');
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo enviar el correo de restablecimiento.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden max-w-md w-full"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-800 p-8 text-white">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center"
          >
            Restablecer Contraseña
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-blue-100 text-center mt-2"
          >
            Ingresa tu correo electrónico para restablecer tu contraseña
          </motion.p>
        </div>

        {/* Form section */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleChange}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <FiMail className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                placeholder="Correo Electrónico"
                className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:shadow-sm"
                disabled={loading}
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm font-medium text-center bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-600 rounded-lg px-4 py-2.5 shadow-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Correo de Restablecimiento'
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300"
            >
              <FiArrowLeft className="text-lg" />
              Volver al inicio de sesión
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
