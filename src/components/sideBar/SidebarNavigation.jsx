/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protectedRoutes } from '@router/routes';
import NavigationItem from './NavigationItem';
import SidebarFooter from './SidebarFooter';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();


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
      <motion.ul className="mb-8">
        {protectedRoutes.map((item) => (
          <motion.li key={item.path} variants={itemVariants}>
            <NavigationItem
              item={item}
              onClick={() => navigate(item.path)}
              isActive={location.pathname === item.path}
            />
          </motion.li>
        ))}
        <SidebarFooter/>
      </motion.ul>
    </motion.div>
  );
};

export default SidebarNavigation;
