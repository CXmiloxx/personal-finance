/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logout from '@/Logout';
import ButtonTheme from '@/ButtonTheme';

const SidebarFooter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.footer
      className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="flex flex-col items-center justify-between gap-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ButtonTheme />
        <Logout click={handleLogout} />
      </motion.div>
    </motion.footer>
  );
};

export default SidebarFooter;
