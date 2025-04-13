// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function ButtonRoute({ onclick, item, open }) {
  const location = useLocation();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center px-4 py-2 w-full rounded-lg transition-all shadow-md
        ${location.pathname === item.path ? 'bg-secon text-white' : 'bg-gray-100 text-gray-800'}
        hover:bg-secon-hover hover:text-white`}
      onClick={onclick}
    >
      <item.icon size={25} className="mr-2" />
      {open && <span className="font-medium">{item.name}</span>}
    </motion.button>
  );
}
