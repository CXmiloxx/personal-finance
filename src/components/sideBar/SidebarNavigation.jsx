/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protectedRoutes } from '@router/routes';
import NavigationItem from './NavigationItem';

const SidebarNavigation = ({ sideOpen}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const allRoutes = [...protectedRoutes];

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
    <motion.ul
      className="mt-4 space-y-16 flex-1 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {allRoutes.map((item) => (
        <motion.li
          key={item.path}
          className="flex items-center"
          variants={itemVariants}
        >
          <NavigationItem
            item={item}
            onClick={() => navigate(item.path)}
            isOpen={sideOpen}
            isActive={location.pathname === item.path}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SidebarNavigation;
