/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import logo from '../assets/react.svg';
export default function CardDynamic({ image }) {
  return (
    <motion.div
      className="w-full sm:w-80 flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={image ? image : logo}
        alt="Card image"
        className="w-50 h-auto object-cover"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
