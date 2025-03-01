import { motion } from "framer-motion";

const Button = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
