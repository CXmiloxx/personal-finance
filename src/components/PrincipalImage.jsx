/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import logo from '../assets/react.svg';

export default function PrincipalImage({ image }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-auto  overflow-hidden"
    >
      <img
        src={image ? image : logo}
        alt="Principal"
        className="w-60 h-auto object-cover"
      />
    </motion.div>
  );
}
