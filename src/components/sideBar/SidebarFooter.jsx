/* eslint-disable no-unused-vars */
import { useAuth } from '#/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ButtonTheme from '../ButtonTheme';
import Logout from '@/Logout';

const SidebarFooter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  

  return (
    <motion.footer
      className="px-4 py-6 border-t bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-dark-text shadow-inner"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-4 items-center sm:flex-col">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <ButtonTheme />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Logout click={handleLogout} />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default SidebarFooter;
