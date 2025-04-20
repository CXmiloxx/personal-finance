/* eslint-disable no-unused-vars */
import Sidebar from '@/sideBar/Sidebar';
import { motion } from 'framer-motion';
import { useSidebarState } from '!/useSidebar';

export default function Layout({ children }) {
  const {isOpen} = useSidebarState();

  return (
    <div className="flex">
      <Sidebar />

      <motion.div
        initial={{ marginLeft: 60 }}
        animate={{ marginLeft: isOpen ? 240 : 60 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 p-4 transition-all"
      >
        {children}
      </motion.div>
    </div>
  );
}
