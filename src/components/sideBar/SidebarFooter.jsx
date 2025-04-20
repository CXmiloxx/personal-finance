/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import Logout from '@/Logout';
import ButtonTheme from '@/ButtonTheme';
import { useSidebarState } from '!/useSidebar';
import clsx from 'clsx';

const SidebarFooter = () => {
  const { isOpen } = useSidebarState();

  return (
    <motion.footer
      className={clsx(
        "py-4 border-t border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg",
        "flex flex-col items-center justify-center space-y-4 transition-all ease-in-out"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="w-full  flex flex-col items-center justify-center gap-4"
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <ButtonTheme />
        <Logout />
      </motion.div>
    </motion.footer>
  );
};

export default SidebarFooter;
