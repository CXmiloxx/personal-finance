/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
      >
        {/* Lado izquierdo: ilustración / branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-800 text-white items-center justify-center p-10"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">¡Bienvenido!</h2>
            <p className="text-sm text-blue-100">
              Ingresa tus credenciales para acceder al sistema
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              alt="Login Illustration"
              className="w-32 h-32 mx-auto animate-bounce"
            />
          </div>
        </motion.div>

        {/* Lado derecho: formulario */}
        <div className="w-full md:w-1/2 p-10 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              Inicia Sesión
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Por favor ingresa tu usuario y contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                autoComplete="email"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={userData.password}
                onChange={handleInputChange}
                required
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm text-center font-medium bg-red-100 dark:bg-red-400/20 px-3 py-2 rounded-md shadow-sm border border-red-300 dark:border-red-500"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    />
                  </svg>
                  Cargando...
                </>
              ) : (
                <>
                  <FiLogIn className="text-lg" />
                  Iniciar sesión
                </>
              )}
            </motion.button>
            <motion.div>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                ¿No tienes una cuenta?{' '}
                <a
                  href="/"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-semibold"
                >
                  Regístrate aquí
                </a>
              </p>
            </motion.div>

            <motion.div>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-semibold"
                >
                  Olvidé mi contraseña
                </a>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
