/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protectedRoutes } from '@router/routes';
import NavigationItem from './NavigationItem';
import SidebarFooter from './SidebarFooter';
import clsx from 'clsx';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
  whileHover: { scale: 1.02 },
};

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      className="flex-1 px-2 pt-2 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.ul className="space-y-3">
        {protectedRoutes.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.li
              key={item.path}
              variants={itemVariants}
              layout
              whileHover="whileHover"
              className={clsx(
                'rounded-md transition-all duration-300',
                'hover:bg-gray-100 dark:hover:bg-neutral-800',
                {
                  'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-white shadow-md border-l-4 border-blue-500':
                    isActive,
                }
              )}
            >
              <NavigationItem
                item={item}
                onClick={() => navigate(item.path)}
                isActive={isActive}
              />
            </motion.li>
          );
        })}
        <SidebarFooter />
      </motion.ul>
    </motion.nav>
  );
};

export default SidebarNavigation;
