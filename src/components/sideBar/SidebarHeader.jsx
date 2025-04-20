/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '#/AuthContext';
import { useTheme } from '#/ThemeContext';
import { useSidebarState } from '!/useSidebar';
import clsx from 'clsx';
import logo from '/logo.png';
import logoDark from '/logo-dark.png';

const SidebarHeader = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { isOpen, setIsOpen } = useSidebarState();

  const handleToggle = () => setIsOpen(!isOpen);

  const logoSrc = theme === 'dark' ? logo : logoDark;

  const fadeIn = {
    initial: { opacity: 0.8 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 }
  };

  const nameInitial = user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <motion.div
      className={clsx(
        'border-b border-gray-200 dark:border-gray-700 p-3',
        'transition-all duration-300 ease-in-out flex flex-col'
      )}
      {...fadeIn}
    >
      {/* LOGO Y TÍTULO */}
      <div className="relative flex items-center mb-3">
        <motion.div
          className={clsx(
            'flex items-center',
            isOpen ? 'gap-3' : 'justify-center w-full'
          )}
        >
          <motion.img
            src={logoSrc}
            alt="Logo Mis Finanzas"
            role="img"
            className={clsx('h-8 transition-all duration-300', {
              'mx-auto': !isOpen,
            })}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
          {isOpen && (
            <motion.h1
              className="text-lg font-bold text-gray-800 dark:text-white tracking-tight"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Mis Finanzas
            </motion.h1>
          )}
        </motion.div>

        {/* BOTÓN TOGGLE */}
        <motion.button
          onClick={handleToggle}
          aria-label="Ocultar o mostrar sidebar"
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 right-[-32px]',
            'w-8 h-8 rounded-full z-50',
            'bg-bg text-white',
            'shadow-lg border border-gray-300 dark:border-gray-600',
            'hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200',
            'flex items-center justify-center'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronLeft />
          </motion.div>
        </motion.button>
      </div>

      {/* USUARIO */}
      {isOpen && user && (
        <motion.div
          className="relative flex items-center mb-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold shadow-md">
            {nameInitial}
          </div>
          <div className="flex flex-col pl-4">
            <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {user.name || 'Usuario'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email || 'usuario@gmail.com'}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SidebarHeader;
