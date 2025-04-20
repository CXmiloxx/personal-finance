/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import clsx from 'clsx';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import { useSidebarState } from '!/useSidebar';

export default function Sidebar() {
  const { isOpen } = useSidebarState();

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: isOpen ? 260 : 60 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={clsx(
        'h-screen fixed top-0 left-0 z-50 flex flex-col justify-between',
        'shadow-xl border-r-2 border-dashed backdrop-blur-lg',
        'bg-white/30 text-light-text border-black/70',
        'dark:bg-dark-bg/60 dark:text-dark-text dark:border-white/80',
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SidebarHeader />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={clsx('flex-1 overflow-y-auto px-0 py-4')}
      >
        <SidebarNavigation />
      </motion.div>
    </motion.div>
  );
}
