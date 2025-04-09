/* eslint-disable no-unused-vars */
import Sidebar from '@/sideBar/Sidebar';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sideOpen={open} setSideOpen={setOpen} />

      {/* Contenido que se mueve suavemente */}
      <motion.div
        initial={{ marginLeft: 60 }}
        animate={{ marginLeft: open ? 240 : 60 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 p-4 transition-all"
      >
        {children}
      </motion.div>
    </div>
  );
}
