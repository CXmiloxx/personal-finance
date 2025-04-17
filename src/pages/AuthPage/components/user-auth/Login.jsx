/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Swal from 'sweetalert2';

export default function Login() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userData);
      navigate('/categorias');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setUserData({ email: '', password: '' });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'No se pudo iniciar sesión.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-400 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-800 text-white items-center justify-center p-10"
        >
          <div className="text-center space-y-5">
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

        <div className="w-full md:w-1/2 p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">Inicia Sesión</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ingresa tu usuario y contraseña</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={userData.email}
                onChange={handleInputChange}
                required
                className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:shadow-sm"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={userData.password}
                onChange={handleInputChange}
                required
                className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:shadow-sm"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-600 text-sm font-medium text-center bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-600 rounded-lg px-4 py-2 shadow-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
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
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <FiLogIn className="text-lg" />
                  Iniciar sesión
                </>
              )}
            </motion.button>

            {/* Enlaces */}
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              ¿No tienes cuenta?{' '}
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
              >
                Regístrate aquí
              </a>
            </div>

            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              <a
                href="/reset-password"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
