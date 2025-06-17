/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '#/AuthContext';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

export default function SignUp() {
  const { signUpUser } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signUpUser(userData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-indigo-600 via-gray-800 to-blue-600 dark:from-blue-500 dark:via-gray-600 dark:to-gray-900 transition-all duration-500">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] p-8 md:p-10 w-full max-w-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-gray-200 to-blue-500 bg-clip-text text-transparent mb-3"
        >
          Crear cuenta
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-6"
        >
          Únete y explora una nueva experiencia
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 text-red-800 px-4 py-2.5 rounded-md mb-4 text-sm border border-red-200 dark:bg-red-900 dark:text-red-300"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: 'Nombre de usuario',
              name: 'name',
              type: 'text',
              icon: <FiUser className="text-lg" />,
            },
            {
              label: 'Correo electrónico',
              name: 'email',
              type: 'email',
              icon: <FiMail className="text-lg" />,
            },
            {
              label: 'Contraseña',
              name: 'password',
              type: 'password',
              icon: <FiLock className="text-lg" />,
            },
          ].map(({ label, name, type, icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (i + 1) }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                  {icon}
                </span>
                <input
                  type={type}
                  name={name}
                  value={userData[name]}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner hover:shadow-md"
                  placeholder={`Tu ${label.toLowerCase()}`}
                />
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-gray-800 hover:brightness-110 text-white font-bold py-2.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
                Creando cuenta...
              </>
            ) : (
              <>
                <FiUserPlus className="text-lg" />
                Registrarse
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6"
        >
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/login"
            className="text-indigo-600 hover:text-blue-600 dark:text-indigo-400 font-semibold transition-colors duration-200"
          >
            Inicia sesión
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
