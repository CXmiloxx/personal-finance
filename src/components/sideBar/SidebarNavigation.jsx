/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protectedRoutes } from '@router/routes';
import NavigationItem from './NavigationItem';

const SidebarNavigation = ({ sideOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeGroups = {
    main: protectedRoutes.filter((route) => ['Inicio'].includes(route.name)),
    features: protectedRoutes.filter((route) =>
      ['Servicios', 'Halloween 2022'].includes(route.name),
    ),
    info: protectedRoutes.filter((route) => ['Nosotros'].includes(route.name)),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="mt-4 flex-1 overflow-hidden px-2"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Grupo Principal */}
      <motion.ul className="mb-8">
        {routeGroups.main.map((item) => (
          <motion.li key={item.path} variants={itemVariants}>
            <NavigationItem
              item={item}
              onClick={() => navigate(item.path)}
              isOpen={sideOpen}
              isActive={location.pathname === item.path}
            />
          </motion.li>
        ))}
      </motion.ul>

      {/* Grupo de Características */}
      {sideOpen && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-3">
          Características
        </div>
      )}
      <motion.ul className="mb-8 space-y-1">
        {routeGroups.features.map((item) => (
          <motion.li key={item.path} variants={itemVariants}>
            <NavigationItem
              item={item}
              onClick={() => navigate(item.path)}
              isOpen={sideOpen}
              isActive={location.pathname === item.path}
            />
          </motion.li>
        ))}
      </motion.ul>

      {/* Grupo de Información */}
      {sideOpen && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-3">
          Información
        </div>
      )}
      <motion.ul className="space-y-1">
        {routeGroups.info.map((item) => (
          <motion.li key={item.path} variants={itemVariants}>
            <NavigationItem
              item={item}
              onClick={() => navigate(item.path)}
              isOpen={sideOpen}
              isActive={location.pathname === item.path}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SidebarNavigation;
