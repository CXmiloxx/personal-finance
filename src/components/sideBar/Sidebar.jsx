/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';

export default function Sidebar({ sideOpen, setSideOpen }) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <motion.div
      initial={{ width: 60 }}
      animate={{ width: sideOpen ? 240 : 60 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text fixed left-0 top-0 shadow-2xl flex flex-col"
    >
      <SidebarHeader sideOpen={sideOpen} setSideOpen={setSideOpen} />

      <SidebarNavigation
        sideOpen={sideOpen}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
      />

      <SidebarFooter />
    </motion.div>
  );
}
